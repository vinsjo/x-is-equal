// import {isArr, isObj} from "x-is-type";
export type equalityChecker = (...args) => boolean;
export type argsComparer = (a, b) => boolean;
export type argsValidator = equalityChecker;

const createEqualityChecker = (
  argsComparerFn: argsComparer,
  validateArgsFn?: argsValidator
): equalityChecker => {
  return function (...args): boolean {
    if (args.length < 2) return true;
    if (isFn(validateArgsFn) && !validateArgsFn(...args)) return false;
    const comparer = isFn(argsComparerFn) ? argsComparerFn : (a, b) => a === b;
    for (let i = 1; i < args.length; i++) {
      const a = args[i - 1],
        b = args[i];
      if (comparer(a, b)) continue;
      return false;
    }
    return true;
  };
};

const isEqualConstructor = createEqualityChecker(
  (a, b) => a.constructor.name === b.constructor.name
);

export { isEqualConstructor };
