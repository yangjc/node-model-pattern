/**
 * YJC <yangjiecong@live.com>
 */

'use strict';

import { ModelDao } from '@yjc/model-pattern';
import { MysqlQueryData } from '@yjc/mysql';

export class DaoMysqlDemo extends ModelDao {

    async showTables(): Promise<MysqlQueryData> {
        return await this.mysql.query(`show tables`) as MysqlQueryData;
    }

}
