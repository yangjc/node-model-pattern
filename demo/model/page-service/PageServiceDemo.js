/**
 * YJC <yangjiecong@live.com> @2017-12-16
 */

'use strict';

const { getModelContext, modelUtil } = require('../pub/MUtil');
const { DataServiceDemo } = require('../data-service/DataServiceDemo');

class PageServiceDemo {

    async action() {
        const context = getModelContext();

        const dataServiceDemo = new DataServiceDemo(context);
        let result = await dataServiceDemo.testDb();
        await context.end();

        modelUtil.assert(result.length > 0, modelUtil.errorCodes.E_NO_TABLES);

        return result;
    }

}

exports.PageServiceDemo = PageServiceDemo;
