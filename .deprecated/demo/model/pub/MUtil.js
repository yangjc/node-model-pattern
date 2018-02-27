/**
 * YJC <https://github.com/yangjc> @2017-12-16
 */

'use strict';

const { ModelUtil, ModelUtilSetter, getGetModelContext, ModelContextSetter } = require('@yjc/model-pattern');

exports.modelUtil = new ModelUtil(
    new ModelUtilSetter().setErrorCodes(require('../../config/error-codes'))
);
exports.getModelContext = getGetModelContext(
    new ModelContextSetter().setMysqlPool(require('../../config/mysql')['pool-options'])
);
