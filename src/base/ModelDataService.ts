/**
 * YJC <https://github.com/yangjc>
 */

'use strict';

import { errorCodesContainer } from '../lib/ErrorCodes';
import { has } from '../lib/Util';
import { ModelContext, ContextItemPack, ITEM_NAME, SET_ITEM } from '../lib/ModelContext';

export class ModelDataService {

    protected assert = errorCodesContainer.assert;

    protected getContextItem<T>(pack: ContextItemPack<T>): T {
        if (has(this.context, pack[ITEM_NAME])) {
            return this.context[pack[ITEM_NAME]];
        }

        return this.context[SET_ITEM]<T>(this, pack);
    }

    get context(): ModelContext {
        const name = Object.getPrototypeOf(this).constructor.name;
        throw new Error(
            `Should call "${name}.setContext(ModelPageService.context)" before using "${name}.context".`
        );
    }

    setContext(context: ModelContext): this {
        Object.defineProperty(this, 'context', { value: context });
        return this;
    }

}
