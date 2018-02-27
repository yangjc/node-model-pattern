/**
 * YJC <https://github.com/yangjc>
 */

'use strict';

import { PageExtendBase } from '../extend-base/page-service/PageExtendBase';
import '../extend-base/pub/MyBase';

(async () => {
    const page = new PageExtendBase();
    try {
        console.log(await page.main());
    } catch (e) {
        console.error(e);
    }
    await page.end();
    console.log(await page.main());
    console.log(await page.main());
    console.log(await page.main());
    await page.end();
})().catch(console.error);
