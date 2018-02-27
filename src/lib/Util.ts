/**
 * YJC <https://github.com/yangjc>
 */

'use strict';

export function has(value: any, name: string | number | symbol): boolean {
    if (value === undefined || value === null) {
        return false;
    }
    return Object.prototype.hasOwnProperty.call(value, name);
}

export function print(text: string, ...vars: any[]): string {
    let offset: number = 0;
    return `${text}`.replace(/%[s%]/g, ($0: string): string => {
        return $0 === '%%' ? '%' : vars[offset++];
    });
}
