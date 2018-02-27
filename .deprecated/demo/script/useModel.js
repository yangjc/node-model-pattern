/**
 * YJC <https://github.com/yangjc> @2017-12-16
 */

'use strict';

const { PageServiceDemo } = require('../model/page-service/PageServiceDemo');

module.parent === null && (async function () {
    try {
        console.log(await new PageServiceDemo().action());
    } catch (e) {
        console.error(e);
    }
})();
