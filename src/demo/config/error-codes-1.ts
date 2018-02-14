/**
 * YJC <yangjiecong@live.com>
 */

'use strict';

import { defineErrorCodes } from '@yjc/model-pattern';

export const errorCodes1 = defineErrorCodes(1, 'ErrorCodes1', {
    ArgvError: {
        code: 1,
        tip: 'Should pass "1" or "2", got "%s".'
    },
    DoNotUse_1_: 2,
});
