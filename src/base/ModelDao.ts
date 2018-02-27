/**
 * YJC <https://github.com/yangjc>
 */

'use strict';

import { MysqlPool } from '@yjc/mysql';

import { errorCodesContainer } from '../lib/ErrorCodes';
import { has } from '../lib/Util';
import { ContextItemPack, packContextItem, ModelContext, SET_ITEM, ITEM_NAME } from '../lib/ModelContext';
import { getPool, endPool } from '../plugin/DbMysql';

const mysqlPack = packContextItem<MysqlPool>('mysql', () => getPool(), endPool);

export class ModelDao {

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

    get mysql(): MysqlPool {
        return this.getContextItem<MysqlPool>(mysqlPack);
    }

}
