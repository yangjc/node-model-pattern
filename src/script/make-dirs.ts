/**
 * YJC <yangjiecong@live.com>
 */

'use strict';

import { resolve } from 'path';
import { Stats, stat, mkdir } from 'fs';
import { promisify } from 'util';

class MakeDirs {

    readonly targetDir: string;
    readonly dirs = [
        'dao',
        'data-service',
        'page-service',
        'pub',
    ];

    constructor(targetDir: string) {
        this.targetDir = resolve(targetDir);
    }

    private async check() {
        try {
            const s: Stats = await promisify(stat)(this.targetDir);
            if (!s.isDirectory()) {
                throw new Error(`Target "${this.targetDir}" should be directory.`);
            }
        } catch (e) {
            if (e.code === 'ENOENT') {
                await promisify(mkdir)(this.targetDir);
            } else {
                throw e;
            }
        }
    }

    async mkdirs() {
        await this.check();
        for (let item of this.dirs) {
            await promisify(mkdir)(`${this.targetDir}/${item}`);
        }
    }

}

module.parent === null && (async () => {
    const dir: string = process.argv[2];
    if (!dir) {
        return console.log(`Usage
    node make-dirs.js target-directory-path`);
    }

    const m = new MakeDirs(resolve(process.cwd(), dir));
    await m.mkdirs();
    console.log('Done.');
})().catch(console.error);
