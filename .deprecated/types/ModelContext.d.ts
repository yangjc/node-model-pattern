/**
 * YJC <yangjiecong@live.com> @2017-10-16
 */

import * as mysql from 'mysql';
import { MysqlPool } from '@yjc/mysql';

export declare class ModelContext {

    readonly mysql: MysqlPool;

    public end(): Promise<void>;

}

declare interface SetterMysql {
    module: any;
    poolConfig: mysql.PoolConfig;
}

export declare class ModelContextSetter {

    private mysql?: SetterMysql;

    public setMysqlPool(poolConfig: mysql.PoolConfig): ModelContextSetter;

}

export declare function getGetModelContext(setter: ModelContextSetter): () => ModelContext;
