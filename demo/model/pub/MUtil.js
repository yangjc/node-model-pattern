/**
 * YJC <yangjiecong@live.com> @2017-12-16
 */

'use strict';

const { ModelUtil, ModelUtilSetter, getGetModelContext, ModelContextSetter } = require('@yjc/model-pattern');

exports.modelUtil = new ModelUtil(
    new ModelUtilSetter().setErrorCodes(require('../../config/error-codes'))
);
exports.getModelContext = getGetModelContext(
    new ModelContextSetter().setDb(require('../../config/db'), 'test')
);
