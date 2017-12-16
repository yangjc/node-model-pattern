/**
 * YJC <yangjiecong@live.com> @2017-10-16
 */

import { Mysql } from '@yjc/db/types/Mysql';

export declare class ModelContext {

    readonly db: Mysql;

    public end(): Promise<void>;

}

declare interface SetterDb {
    config: string | any;
    name: string;
    instanceGetter: (dbConfig: string | any, dbName?: string) => Mysql;
}

export declare class ModelContextSetter {

    private db?: SetterDb;

    public setDb(dbConfig: string | any, dbName?: string): ModelContextSetter;

}

export declare function getGetModelContext(setter: ModelContextSetter): () => ModelContext;
