import { isArr, isObj } from 'x-is-type';

/**
 * Determine if a and b are equal,
 * strict equal checks are performed on primitive types and
 * deep equal checks are performed on arrays and objects.
 */
export function isEqual(a: unknown, b: unknown): boolean {
    return a === b || isEqualArr(a, b) || isEqualObj(a, b);
}

/** Recursively determine if two values are arrays and contain equal values. */
export function isEqualArr(a: unknown, b: unknown) {
    if (!isArr(a) || !isArr(b) || a.length !== b.length) return false;
    if (a === b) return true;
    for (let i = 0; i < a.length; i++) {
        if (!isEqual(a[i], b[i])) return false;
    }
    return true;
}
/** Recursively determine if two values are objects and contain equal enumerable values. */
export function isEqualObj(a: unknown, b: unknown) {
    if (!isObj(a) || !isObj(b)) return false;
    if (a === b) return true;
    const keys = {
        a: Object.keys(a),
        b: Object.keys(b),
    };
    if (keys.a.length !== keys.b.length) return false;
    for (const key of keys.a) {
        if (!(key in b) || !isEqual(a[key], b[key])) {
            return false;
        }
    }
    return true;
}
