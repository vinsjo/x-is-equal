import { isArr, isFn, isMap, isObj, isSet } from 'x-is-type';
import { isEqualValues, includesEqualValues, isEqualType } from './utils';

export interface ShallowEqualOptions {
  /**
   * Check equality of functions by comparing returned
   * values of their toString method as opposed to checking by referential equality.
   * Default is false.
   */
  functionsAsStrings?: boolean;
  /**
   * Check equality of Arrays by only comparing values at same index.
   * Default is true.
   * NOTE: If {@link noIteration} is true, this has no effect.
   */
  strictArrayOrder?: boolean;
  /**
   * If properties of objects should not be compared iteratively.
   * Default is false.
   */
  noIteration?: boolean;
}

/**
 * Check if two values are equal, or contains equal property values
 *
 * @param options {@link IsShallowEqualOptions}
 */
export const isShallowEqual = (
  a: unknown,
  b: unknown,
  options: ShallowEqualOptions = {}
): boolean => {
  const {
    functionsAsStrings = false,
    strictArrayOrder = true,
    noIteration = false,
  } = options;

  if (!isEqualType(a, b)) return false;

  if (isEqualValues(a, b, functionsAsStrings)) return true;

  if (noIteration || !isObj(a) || !isObj(b)) return false;

  if (isSet(a)) {
    if (!isSet(b) || a.size !== b.size) return false;
    return Array.from(a).every((value) => b.has(value));
  }

  if (isMap(a)) {
    if (!isMap(b) || a.size !== b.size) return false;
    return Array.from(a.keys()).every((key) => {
      if (!b.has(key)) return false;
      return isEqualValues(a.get(key), b.get(key), functionsAsStrings);
    });
  }

  if (isArr(a)) {
    if (!isArr(b) || a.length !== b.length) return false;

    if (!strictArrayOrder) {
      return a.every((value) => {
        if (!functionsAsStrings || !isFn(value)) return b.includes(value);

        const stringValue = value.toString();
        return b.find(
          (value) => isFn(value) && value.toString() === stringValue
        );
      });
    }
    return a.every((value, index) =>
      isEqualValues(value, b[index], functionsAsStrings)
    );
  }

  const keys = {
    a: Object.keys(a),
    b: Object.keys(b),
  };

  if (!includesEqualValues(keys.a, keys.b)) return false;

  return keys.a.every((key) =>
    isEqualValues(a[key], b[key], functionsAsStrings)
  );
};
