/* eslint-disable @typescript-eslint/no-explicit-any */
import { isArr, isObj } from 'x-is-type';

export type equalityChecker = (...args: unknown[]) => boolean;
export type argsComparer = (a: any, b: any) => boolean;
export type argsValidator = equalityChecker;

type obj = Record<string | number | symbol, unknown>;

function checkEquality(args: any[], comparer: (a: any, b: any) => boolean) {
    if (args.length < 2) return true;
    const type = typeof args[0];
    if (!args.every((value) => typeof value === type)) return false;
    for (let i = 1; i < args.length; i++) {
        if (args[i - 1] === args[i]) continue;
        if (!comparer(args[i - 1], args[i])) return false;
    }
    return true;
}

/**
 * Determine if multiple values are arrays and contain equal values recursively
 */
function isEqualArr(...args: any[]) {
    if (!isArr(...args)) return false;
    return checkEquality(args, (a: any[], b: any[]) => {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            const equal =
                a[i] === b[i] ||
                (a[i] === a && b[i] === b) ||
                isEqualArr(a[i], b[i]) ||
                isEqualObj(a[i], b[i]);
            if (!equal) return false;
        }
        return true;
    });
}
/**
 * Determine if multiple values are objects and contain equal values recursively
 * Ignores object constructor, just checks enumerable values
 */
function isEqualObj(...args: any[]) {
    if (!isObj(...args)) return false;
    return checkEquality(args, (a: obj, b: obj) => {
        const keys = { a: Object.keys(a), b: Object.keys(b) };
        if (keys.a.length !== keys.b.length) return false;
        for (const k of keys.a) {
            const equal =
                k in b &&
                (a[k] === b[k] ||
                    (a[k] === a && b[k] === b) ||
                    isEqualArr(a[k], b[k]) ||
                    isEqualObj(a[k], b[k]));
            if (!equal) return false;
        }
        return true;
    });
}

/**
 * Determine if multiple values are equal,
 * strict equal checks are performed on primitive types and
 * deep equal checks are performed on arrays and objects.
 */
function isEqual(...args: any[]) {
    return checkEquality(args, (a, b) => isEqualArr(a, b) || isEqualObj(a, b));
}

export { isEqual, isEqualArr, isEqualObj };
