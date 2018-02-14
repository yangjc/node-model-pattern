/**
 * YJC <yangjiecong@live.com> @2017-12-15
 */

'use strict';

class ModelContextSetter {
    
    setMysqlPool(poolConfig) {
        this.mysql = {
            module: require('@yjc/mysql'),
            poolConfig: poolConfig
        };
        return this;
    }
    
}

const getGetModelContext = (setter) => {

    let _mysqlModule;
    let _mysqlPoolConfig;
    
    if (setter.hasOwnProperty('mysql')) {
        _mysqlModule = setter.mysql.module;
        _mysqlPoolConfig = setter.mysql.poolConfig;
    }

    const ModelContext = class {

        // mysql pool
        get mysql() {
            return this._mysqlPool || (this._mysqlPool = _mysqlModule.createPool(_mysqlPoolConfig));
        }

        async end() {
            if (this._mysqlPool) {
                const mysqlPool = this._mysqlPool;
                delete this._mysqlPool;
                await mysqlPool.end();
            }
        }

    };

    return () => {
        return new ModelContext();
    };
};

exports.getGetModelContext = getGetModelContext;
exports.ModelContextSetter = ModelContextSetter;
