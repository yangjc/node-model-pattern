/**
 * YJC <yangjiecong@live.com>
 */

'use strict';

import { PoolConfig } from 'mysql';
import { createPool as TCreatePool, MysqlPool } from '@yjc/mysql';

interface PoolConfigs {
    [name: string]: PoolConfig | string;
}

let createPool: typeof TCreatePool;
let defaultPoolConfig: PoolConfig | string;
const poolConfigs: PoolConfigs = {};

export function getPool(configName?: string): MysqlPool {
    if (configName === undefined) {
        if (defaultPoolConfig) {
            return createPool(defaultPoolConfig);
        }
        
        throw new Error(`Unexpected default MySQL pool config.`);
    }

    if (poolConfigs[configName]) {
        return createPool(poolConfigs[configName]);
    }

    throw new Error(`Unexpected MySQL pool config "${configName}".`);
}

export async function endPool(pool?: MysqlPool): Promise<void> {
    pool && await pool.end();
}

export function setPoolConfig(defaultConfig: PoolConfig | string | null, configs?: PoolConfigs): void {
    typeof createPool === 'undefined' && (createPool = require('@yjc/mysql').createPool);
    defaultConfig && (defaultPoolConfig = defaultConfig);
    Object.assign(poolConfigs, configs);
}
