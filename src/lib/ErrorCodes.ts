/**
 * YJC <yangjiecong@live.com>
 */

'use strict';

import { has, print } from './Util';

export interface ErrorCodeDefinition {
    code: number;
    tip: string;
}

export interface ErrorCodesDefinition {
    [errorName: string]: number | ErrorCodeDefinition;
}

export interface ErrorCodes {
    [errorName: string]: number;
}

export class ExternalError extends Error {

    readonly eCode: number;
    readonly eTip: string;

    constructor(message: string, eCode: number, eTip: string = '', ErrorType: string = 'Error') {
        super(message);
        this.name = ErrorType;
        this.eCode = eCode;
        this.eTip = eTip;
    }

}

interface Names {
    [code: number]: string;
}

interface Tips {
    [code: number]: string;
}

type Codes<T> = {
    [K in keyof T]: number;
};

const MAX_CODE = 10000;

class ErrorCodesContainer {

    private codes: ErrorCodes = {};
    private names: Names = {};
    private tips: Tips = {};

    constructor() {
        this.assert = this.assert.bind(this);
    }

    setCodes(codes: ErrorCodesDefinition, index: number, indexName: string): ErrorCodes {
        if (!Number.isInteger(index) || index < 0) {
            throw new RangeError(`Error index (${index}, ${indexName}) out of range.`);
        }

        const newCodes: ErrorCodes = {};

        for (let name in codes) {
            if (has(codes, name)) {
                const { code, tip }: ErrorCodeDefinition = typeof codes[name] === 'number'
                    ? {code: (codes[name] as number), tip: name}
                    : (codes[name] as ErrorCodeDefinition);
                const _name: string = `${indexName}.${name}`;
                if (!Number.isInteger(code) || code < 0 || code >= MAX_CODE) {
                    throw new RangeError(`Error code "${_name}=${code}" out of range.`);
                }
                const _code: number = index * MAX_CODE + code;
                if (has(this.codes, _name)) {
                    throw new Error(`Error name "${_name}=${code}" duplicated with "${_name}=${this.codes[_name]}".`);
                }
                if (has(this.names, _code)) {
                    throw new Error(`Error code of "${_name}=${code}" duplicated with "${this.names[_code]}".`);
                }
                newCodes[name] = _code;
                this.codes[_name] = _code;
                this.names[_code] = _name;
                tip && (this.tips[_code] = tip);
            }
        }

        return newCodes;
    }

    private getErrorName(errorCode: number): string {
        return has(this.names, errorCode) ? `name=${this.names[errorCode]}` : `code=${errorCode}`;
    }

    assert(value: boolean, errorCode: number, ...printArgs: any[]) {
        if (value === true) {
            return;
        }

        const e = new ExternalError(
            this.getErrorName(errorCode), 
            errorCode,
            has(this.tips, errorCode) ? print(this.tips[errorCode], ...printArgs) : '',
            'AssertionError'
        );
        Error.captureStackTrace(e, Object.getPrototypeOf(this).assert);

        throw e;
    }

}

export const errorCodesContainer = new ErrorCodesContainer();

export function defineErrorCodes<T extends ErrorCodesDefinition>(index: number, indexName: string, codes: T): Codes<T> {
    return errorCodesContainer.setCodes(codes, index, indexName) as Codes<T>;
}
