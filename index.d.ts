/**
 * YJC <yangjiecong@live.com> @2017-12-16
 */

export { getGetModelContext, ModelContextSetter, ModelContext } from './types/ModelContext';

export { ModelUtil, ModelUtilSetter } from './types/ModelUtil';

export { ModelDao } from './types/ModelDao';
export { ModelDataService } from './types/ModelDataService';

import { ErrorCodes as TErrorCodes, ErrorNames as TErrorNames } from './types/ErrorCodes';

import { Mysql, MysqlTypes } from '@yjc/db/types/Mysql';

export declare namespace ModelTypes {

    export type ErrorCodes = TErrorCodes;
    export type ErrorNames = TErrorNames;

    export type DbMysql = Mysql;
    export type MysqlQueryData = MysqlTypes.QueryData;
    export type MysqlQueryResult = MysqlTypes.QueryResult;
    export type MysqlQueryFields = MysqlTypes.QueryFields;

}
