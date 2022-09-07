export declare type equalityChecker = (...args: any[]) => boolean;
export declare type argsComparer = (a: any, b: any) => boolean;
export declare type argsValidator = equalityChecker;
declare const isEqualConstructor: (...args: any[]) => boolean;
/**
 * Determine if multiple arrays contain equal values recursively
 */
declare function isEqualArr(...args: any[]): boolean;
/**
 * Determine if multiple objects contain equal values recursively
 */
declare function isEqualObj(...args: any[]): boolean;
/**
 * Determine if multiple values are equal,
 * works recursively on arrays and objects.
 */
declare function isEqual(...args: any[]): boolean;
export { isEqual, isEqualConstructor, isEqualArr, isEqualObj };
