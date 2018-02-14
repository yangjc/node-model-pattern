/**
 * YJC <yangjiecong@live.com>
 */

'use strict';

import { MysqlQueryData } from '@yjc/mysql';
import { MyModelDao } from '../pub/MyBase';

export class DaoExtends extends MyModelDao {

    async showTables(): Promise<MysqlQueryData> {
        return await this.mysql.query(`show tables`) as MysqlQueryData;
    }

    async showTables2(): Promise<MysqlQueryData> {
        return await this.mysql2.query(`show tables`) as MysqlQueryData;
    }

}
