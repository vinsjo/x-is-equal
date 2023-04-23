import { isDate, isFn, isNullish } from 'x-is-type';

export const includesEqualValues = (a: unknown[], b: unknown[]): boolean => {
  return a.length === b.length && a.every((value) => b.includes(value));
};

export const isEqualDate = (a: Date, b: Date): boolean => {
  return Object.is(a.valueOf(), b.valueOf());
};

export const hasEqualPrototype = (a: unknown, b: unknown): boolean => {
  if (isNullish(a)) return Object.is(a, b);
  return Object.getPrototypeOf(a) === Object.getPrototypeOf(b);
};

export const isEqualType = (a: unknown, b: unknown): boolean => {
  return typeof a === typeof b && hasEqualPrototype(a, b);
};

export const isEqualValues = (
  a: unknown,
  b: unknown,
  functionsAsStrings = false
): boolean => {
  if (typeof a !== typeof b || !hasEqualPrototype(a, b)) return false;
  if (isDate(a)) return isDate(b) && isEqualDate(a, b);
  if (functionsAsStrings && isFn(a) && isFn(b)) {
    return Object.is(a.toString(), b.toString());
  }
  return Object.is(a, b);
};
