/**
 * YJC <https://github.com/yangjc> @2017-12-16
 */

'use strict';

const { ModelDataService } = require('@yjc/model-pattern');
const { DaoDemo } = require('../dao/DaoDemo');

class DataServiceDemo extends ModelDataService {

    async testDb() {
        const daoDemo = new DaoDemo(this.context);
        return await daoDemo.showTables();
    }

}

exports.DataServiceDemo = DataServiceDemo;
