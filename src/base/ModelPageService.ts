/**
 * YJC <yangjiecong@live.com>
 */

'use strict';

import { ModelContext } from '../lib/ModelContext';
import { KEY_CONTEXT } from '../inner/Const';
import { errorCodesContainer } from '../lib/ErrorCodes';
import { has } from '../lib/Util';

export interface ContextContainer {
    [KEY_CONTEXT]: ModelContext;
}

export class ModelPageService {

    get context(): ContextContainer {
        const container: ContextContainer = {
            [KEY_CONTEXT]: new ModelContext(),
        };
        Object.defineProperty(this, 'context', { value: container });
        return container;
    }

    async end() {
        has(this, 'context') && await this.context[KEY_CONTEXT].end();
    }

    protected assert = errorCodesContainer.assert;

}
