/**
 * YJC <https://github.com/yangjc>
 */

'use strict';

import * as PluginDbMysql from './plugin/DbMysql';
import { errorCodesContainer } from './lib/ErrorCodes';

export { ModelPageService } from './base/ModelPageService';
export { ModelDataService } from './base/ModelDataService';
export { ModelDao } from './base/ModelDao';

export { ContextItemPack, Getter, End, packContextItem } from './lib/ModelContext';
export { PluginDbMysql };

export {
    ErrorCodes, ErrorCodeDefinition, ErrorCodesDefinition, ExternalError,
    defineErrorCodes
} from './lib/ErrorCodes';
export const assert = errorCodesContainer.assert;

export { has, print } from './lib/Util';

export namespace ModelSetup {
    export const setMysqlPoolConfig = PluginDbMysql.setPoolConfig;
}
