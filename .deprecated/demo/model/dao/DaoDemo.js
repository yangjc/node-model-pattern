/**
 * YJC <https://github.com/yangjc> @2017-12-16
 */

'use strict';

const { ModelDao } = require('@yjc/model-pattern');

class DaoDemo extends ModelDao {

    async showTables() {
        return await this.context.mysql.query('show tables');
    }

}

exports.DaoDemo = DaoDemo;
