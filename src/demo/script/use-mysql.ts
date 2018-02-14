/**
 * YJC <yangjiecong@live.com>
 */

'use strict';

import { PageUseMysql } from '../use-mysql/page-service/PageUseMysql';
import '../use-mysql/pub/Setup';

(async () => {
    const page = new PageUseMysql();
    try {
        console.log(await page.main());
    } catch (e) {
        console.error(e);
    }
    await page.end();
})().catch(console.error);
