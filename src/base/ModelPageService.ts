/**
 * YJC <https://github.com/yangjc>
 */

'use strict';

import { errorCodesContainer } from '../lib/ErrorCodes';
import { has } from '../lib/Util';
import { ModelContext, END } from '../lib/ModelContext';

export class ModelPageService {

    protected assert = errorCodesContainer.assert;

    get context(): ModelContext {
        const value = new ModelContext();
        Object.defineProperty(this, 'context', { value });
        return value;
    }

    async end() {
        has(this, 'context') && await this.context[END]();
    }

}
