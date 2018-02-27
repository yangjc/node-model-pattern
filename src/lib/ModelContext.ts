/**
 * YJC <https://github.com/yangjc>
 */

'use strict';

import { has } from './Util';
import { ModelDao } from '../base/ModelDao';
import { ModelDataService } from '../base/ModelDataService';
import { ModelPageService } from '../base/ModelPageService';

export const SET_ITEM = Symbol('set-item');
export const END = Symbol('end');
export const ITEM_NAME = Symbol('item-name');

const ITEM_PACKS = Symbol('item-packs');

export interface Getter<T> {
    (): T;
}

export interface End<T> {
    (value: T): Promise<void> | void
}

export interface ContextItemPack<T> {
    name: string;
    [ITEM_NAME]: symbol;
    getter: Getter<T>;
    end?: End<T>;
}

type Owner = ModelDao | ModelDataService | ModelPageService;

interface Packs {
    [name: string]: ContextItemPack<any>;
}

export class ModelContext {

    private [ITEM_PACKS]: Packs;

    constructor() {
        this[ITEM_PACKS] = {};
    }

    [SET_ITEM]<T>(owner: Owner, pack: ContextItemPack<T>): T {
        if (typeof pack[ITEM_NAME] !== 'symbol') {
            throw new TypeError(`Should use "packContextItem()" to define context item.`);
        }

        if (has(this[ITEM_PACKS], pack.name)) {
            throw new Error(
                `"${Object.getPrototypeOf(owner).constructor.name}[${pack.name}]" duplicated. `
                + `Should call "packContextItem(${pack.name}, ...)" just once.`
            );
        }

        const value: T = pack.getter();
        Object.defineProperty(this, pack[ITEM_NAME], {
            configurable: true,
            enumerable: false,
            writable: false,
            value,
        });

        this[ITEM_PACKS][pack.name] = pack;
        
        return value;
    }

    async [END](): Promise<void> {
        for (let name of Object.getOwnPropertyNames(this[ITEM_PACKS])) {
            const pack = this[ITEM_PACKS][name];
            const value = this[pack[ITEM_NAME]];
            delete this[pack[ITEM_NAME]];
            delete this[ITEM_PACKS][name];
            if (typeof pack.end === 'function') {
                await pack.end(value);
            }
        }
    }

    [itemName: string]: any;

}

export function packContextItem<T>(name: string, getter: Getter<T>, end?: End<T>): ContextItemPack<T> {
    return {
        name,
        [ITEM_NAME]: Symbol(name),
        getter,
        end,
    };
}
