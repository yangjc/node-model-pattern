/**
 * YJC <https://github.com/yangjc>
 */

'use strict';

import { ModelPageService } from '@yjc/model-pattern';
import { errorCodes1 } from '../../config/error-codes-1';

export class PageUseECodes extends ModelPageService {
    main(a: string) {
        this.assert(a === '1' || a === '2', errorCodes1.ArgvError, a);
        this.assert(a !== '1', errorCodes1.DoNotUse_1_);
        return 'No error.';
    }
}
