/**
 * YJC <yangjiecong@live.com>
 */

'use strict';

import { has } from './Util';
import { ModelDao } from '../base/ModelDao';
import { ModelDataService } from '../base/ModelDataService';
import { ModelPageService } from '../base/ModelPageService';

export interface Getter<T> {
    (): T;
}

export interface End<T> {
    (value: T): (Promise<void> | void)
}

export interface PluginPack<T> {
    name: string;
    getter: Getter<T>;
    end?: End<T>;
}

type Owner = ModelDao | ModelDataService | ModelPageService;

interface OwnItem<T> {
    value: T;
    end: End<T>;
}

interface OwnItems {
    [name: string]: OwnItem<any>;
}

export class ModelContext {

    setOwnProperty<T>(owner: Owner, pack: PluginPack<T>): T {
        const name = pack.name;

        if (has(this, name)) {
            throw new Error(`${Object.getPrototypeOf(owner).constructor.name}[${name}] exists.`);
        }

        const value: T = pack.getter();
        Object.defineProperty(this, name, {
            configurable: true,
            enumerable: false,
            writable: false,
            value,
        });

        if (pack.end) {
            this.ownItems[name] = {
                value,
                end: pack.end,
            } as OwnItem<T>;
        }
        
        return value;
    }

    private ownItems: OwnItems = {};

    async end(): Promise<void> {
        for (let name in this.ownItems) {
            if (has(this.ownItems, name)) {
                const {value, end} = this.ownItems[name];
                delete this.ownItems[name];
                if (has(this, name)) {
                    delete this[name as keyof this];
                }
                end && (await end(value));
            }
        }
    }

}

export function packPlugin<T>(name: string, getter: Getter<T>, end?: End<T>): PluginPack<T> {
    return {
        name,
        getter,
        end,
    };
}
