/**
 * YJC <https://github.com/yangjc>
 */

'use strict';

import { ModelPageService } from '@yjc/model-pattern';
import { Demo } from '../data-service/Demo';

export class PageUseMysql extends ModelPageService {

    async main(): Promise<any> {
        const demo = new Demo().setContext(this.context);
        return await demo.getData();
    }

}
