/**
 * YJC <yangjiecong@live.com>
 */

'use strict';

import { ModelPageService } from '@yjc/model-pattern';
import { Demo } from '../data-service/Demo';

export class PageExtendBase extends ModelPageService {

    async main(): Promise<any> {
        const demo = new Demo().setContext(this.context);
        return await demo.getResult();
    }

}
