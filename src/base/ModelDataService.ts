/**
 * YJC <yangjiecong@live.com>
 */

'use strict';

import { ContextContainer } from './ModelPageService';
import { KEY_CONTEXT } from '../inner/Const';
import { has } from '../lib/Util';
import { ModelContext, PluginPack } from '../lib/ModelContext';
import { errorCodesContainer } from '../lib/ErrorCodes';

export class ModelDataService {

    protected setOwnProperty<T>(pack: PluginPack<T>): T {
        if (has(this.context[KEY_CONTEXT], pack.name)) {
            return (this.context[KEY_CONTEXT][pack.name as keyof ModelContext]) as any;
        }
        
        return this.context[KEY_CONTEXT].setOwnProperty<T>(this, pack);
    }

    get context(): ContextContainer {
        throw new Error(`${Object.getPrototypeOf(this).constructor.name}.context undefined.`);
    }

    setContext(context: ContextContainer): this {
        Object.defineProperty(this, 'context', { value: context });
        return this;
    }

    protected assert = errorCodesContainer.assert;

}
