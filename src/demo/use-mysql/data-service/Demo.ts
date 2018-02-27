/**
 * YJC <https://github.com/yangjc>
 */

'use strict';

import { DaoMysqlDemo } from '../dao/DaoMysqlDemo';
import { ModelDataService } from '@yjc/model-pattern';

export class Demo extends ModelDataService {

    async getData(): Promise<any> {
        const m = new DaoMysqlDemo().setContext(this.context);
        return await m.showTables();
    }

}
