/**
 * YJC <yangjiecong@live.com> @2017-09-14
 */

'use strict';

class ModelUtilSetter {

    setErrorCodes(errorCodes = {}) {
        this.errorCodes = errorCodes;
        this.errorNames = ModelUtilSetter.getErrorNames(errorCodes);
        return this;
    }

    static getErrorNames(errorCodes) {
        let index = {};

        for (let key in errorCodes) {
            if (errorCodes.hasOwnProperty(key)) {
                let code = errorCodes[key];
                if (index.hasOwnProperty(code)) {
                    throw new Error('duplicated error code');
                }
                index[code] = key;
            }
        }

        return index;
    }

}

class ModelUtil {

    constructor(setter) {
        for (let property in setter) {
            if (setter.hasOwnProperty(property)) {
                this[property] = setter[property];
            }
        }
    }

    error(errorCode, message) {
        if (this.errorNames.hasOwnProperty(errorCode)) {
            message = message ?
                `${message} (${this.errorNames[errorCode]})` :
                `Assertion=${this.errorNames[errorCode]}`;
        } else {
            message = message ? `${message} (${errorCode})` : `Assertion=code(${errorCode})`;
        }

        let e = new Error(message);
        e.code = errorCode;

        return e;
    }

    assert(value, errorCode) {
        if (value) {
            return;
        }

        throw this.error(errorCode);
    }

}

exports.ModelUtil = ModelUtil;
exports.ModelUtilSetter = ModelUtilSetter;
