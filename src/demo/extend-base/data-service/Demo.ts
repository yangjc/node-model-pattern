/**
 * YJC <yangjiecong@live.com>
 */

'use strict';

import { DaoExtends } from '../dao/DaoExtends';
import { ModelDataService } from '@yjc/model-pattern';

export class Demo extends ModelDataService {

    async getResult(): Promise<any> {
        const m = new DaoExtends().setContext(this.context);
        const result: any[] = [];
        try {
            result.push(await m.showTables());
        } catch (e) {
            result.push(e.message);
        }
        try {
            result.push(await m.showTables2());
        } catch (e) {
            result.push(e.message);
        }
        return result;
    }

}
