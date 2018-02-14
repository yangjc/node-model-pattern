/**
 * YJC <yangjiecong@live.com>
 */

'use strict';

import { ModelSetup } from '@yjc/model-pattern';

ModelSetup.setMysqlPoolConfig({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'test',
});
