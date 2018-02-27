/**
 * YJC <https://github.com/yangjc> @2017-10-16
 */

import { ErrorCodes, ErrorNames } from './ErrorCodes';

export declare class ModelUtilSetter {

    private errorCodes?: ErrorCodes;
    private errorNames?: ErrorNames;

    public setErrorCodes(errorCodes: ErrorCodes): ModelUtilSetter;

    static getErrorNames(errorCodes: ErrorCodes): ErrorNames;

}

export declare class ModelUtil {

    constructor(setter: ModelUtilSetter);

    readonly errorCodes?: ErrorCodes;
    readonly errorNames?: ErrorNames;

    public error(errorCode: number, message: string) : Error;

    public assert(value: boolean, errorCode: number) : never;

}
