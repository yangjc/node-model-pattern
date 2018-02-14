/**
 * YJC <yangjiecong@live.com>
 */

'use strict';

import { PluginPack, packPlugin, ModelContext } from '../lib/ModelContext';
import { ContextContainer } from './ModelPageService';
import { KEY_CONTEXT } from '../inner/Const';
import { MysqlPool } from '@yjc/mysql';
import { getPool, endPool } from '../plugin/DbMysql';
import { has } from '../lib/Util';
import { errorCodesContainer } from '../lib/ErrorCodes';

const mysqlPack = packPlugin<MysqlPool>('mysql', () => getPool(), endPool);

export class ModelDao {

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

    get mysql(): MysqlPool {
        return this.setOwnProperty<MysqlPool>(mysqlPack);
    }

    protected assert = errorCodesContainer.assert;

}
