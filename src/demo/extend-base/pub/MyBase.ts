/**
 * YJC <https://github.com/yangjc>
 */

'use strict';

import { ModelDao, ModelSetup, PluginDbMysql, packContextItem } from '@yjc/model-pattern';
import { MysqlPool } from '@yjc/mysql';

ModelSetup.setMysqlPoolConfig(null, {
    'config-2': {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'test',
    }
});

const mysql2 = packContextItem<MysqlPool>('mysql2', () => PluginDbMysql.getPool('config-2'), PluginDbMysql.endPool);

export class MyModelDao extends ModelDao {

    get mysql2(): MysqlPool {
        return this.getContextItem<MysqlPool>(mysql2);
    }

}
