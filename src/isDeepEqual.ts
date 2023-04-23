import { isArr, isMap, isObj, isSet } from 'x-is-type';
import { isShallowEqual, ShallowEqualOptions } from './isShallowEqual';

import { includesEqualValues, isEqualType } from './utils';

export interface DeepEqualOptions
  extends Omit<ShallowEqualOptions, 'noIteration' | 'strictArrayOrder'> {
  /**
   * Max depth for recursively comparing properties in objects.
   * Value of 0 or Infinity checks equality at unlimited recursion depth. Default value is 0
   * If value is negative, isEqual is used instead.
   *
   * NOTE: Unlimited recursion depth when comparing large nested data structures could have a
   * large impact on performance
   */
  maxDepth?: number;
  /**
   * Check equality of Arrays or Sets by only comparing values at same index.
   * Default is false.
   *
   * NOTE: Setting strictIterableOrder to false when comparing large data structures could have a
   * large impact on performance, especially when unlimited recursion depth is used.
   */
  strictIterableOrder?: boolean;
}

/**
 * Recursively check if two values are equal or contains equal property values
 *
 * @param options {@link DeepEqualOptions}
 *
 * @example
 * const a = {
 *   // recursion depth: 0
 *   foo: {
 *     // recursion depth: 1
 *     bar: {
 *       // recursion depth: 2
 *       baz: {
 *         // recursion depth: 3
 *         biz: 'buzz'
 *       },
 *     },
 *   },
 * };
 * const b = {
 *   foo: {
 *     bar: {
 *       baz: {
 *         biz: 'buzz'
 *       },
 *     },
 *   },
 * };
 *
 * isDeepEqual(a, b, { maxDepth: 1 }); // => false
 * isDeepEqual(a, b, { maxDepth: 2 }); // => false
 *
 * isDeepEqual(a, b, { maxDepth: 3 }); // => true
 * isDeepEqual(a, b, { maxDepth: 0 }); // => true
 */
export const isDeepEqual = (
  a: unknown,
  b: unknown,
  options: DeepEqualOptions = {}
): boolean => {
  const {
    maxDepth = 0,
    functionsAsStrings = false,
    strictIterableOrder = true,
  } = options;

  function checkEquality(a: unknown, b: unknown, recursionLevel = 0): boolean {
    if (!isEqualType(a, b)) return false;

    if (maxDepth && recursionLevel >= maxDepth) {
      return isShallowEqual(a, b, {
        functionsAsStrings,
        strictArrayOrder: strictIterableOrder,
      });
    }

    if (isShallowEqual(a, b, { functionsAsStrings, noIteration: true })) {
      return true;
    }

    // If any of the values are not objects,stop recursion
    if (!isObj(a) || !isObj(b)) return false;

    if (isArr(a)) {
      if (!isArr(b) || a.length !== b.length) return false;
      if (strictIterableOrder) {
        return a.every((value, index) =>
          checkEquality(value, b[index], recursionLevel + 1)
        );
      }
      return a.every((valueA) =>
        b.find((valueB) => checkEquality(valueA, valueB, recursionLevel + 1))
      );
    }
    if (isSet(a)) {
      if (!isSet(b) || a.size !== b.size) return false;
      const values = {
        a: Array.from(a),
        b: Array.from(b),
      };
      if (strictIterableOrder) {
        return values.a.every((value, index) =>
          checkEquality(value, values.b[index], recursionLevel + 1)
        );
      }
      return values.a.every((valueA) =>
        values.b.find((valueB) =>
          checkEquality(valueA, valueB, recursionLevel + 1)
        )
      );
    }

    if (isMap(a)) {
      if (!isMap(b) || a.size !== b.size) return false;
      return Array.from(a.keys()).every((key) =>
        checkEquality(a.get(key), b.get(key), recursionLevel + 1)
      );
    }

    const keys = {
      a: Object.keys(a),
      b: Object.keys(b),
    };

    if (!includesEqualValues(keys.a, keys.b)) return false;

    // Check equality of object properties recursively
    return keys.a.every((key) =>
      checkEquality(a[key], b[key], recursionLevel + 1)
    );
  }

  return checkEquality(a, b);
};
