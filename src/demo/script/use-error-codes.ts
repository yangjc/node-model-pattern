/**
 * YJC <https://github.com/yangjc>
 */

'use strict';

import { PageUseECodes } from '../use-error-code/page-service/PageUseECodes';

(async () => {
    const page = new PageUseECodes();
    try {
        console.log(page.main(process.argv[2]));
    } catch (e) {
        console.error(`\n${e.eTip}\n`);
        console.error(e);
    }
    await page.end();
})().catch(console.error);
