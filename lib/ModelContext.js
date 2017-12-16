/**
 * YJC <yangjiecong@live.com> @2017-12-15
 */

'use strict';

class ModelContextSetter {
    
    setDb(dbConfig, dbName) {
        this.db = {
            config: dbConfig,
            name: dbName,
            instanceGetter: require('@yjc/db').dbInstance
        };
        return this;
    }
    
}

const getGetModelContext = (setter) => {

    let _dbConfig;
    let _dbName;
    let _dbInstanceGetter;
    
    if (setter.hasOwnProperty('db')) {
        _dbConfig = setter.db.config;
        _dbName = setter.db.name;
        _dbInstanceGetter = setter.db.instanceGetter;
    }

    const ModelContext = class {

        get db() {
            return this._db || (this._db = _dbInstanceGetter(_dbConfig, _dbName));
        }

        async end() {
            if (this._db) {
                const db = this._db;
                delete this._db;
                await db.end();
            }
        }

    };

    return () => {
        return new ModelContext();
    };
};

exports.getGetModelContext = getGetModelContext;
exports.ModelContextSetter = ModelContextSetter;
