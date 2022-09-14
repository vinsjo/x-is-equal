/* eslint-disable @typescript-eslint/no-explicit-any */
import { isArr, isObj, isDate } from 'x-is-type';

export type equalityChecker = (...args: unknown[]) => boolean;
export type argsComparer = (a: any, b: any) => boolean;
export type argsValidator = equalityChecker;

type obj = Record<string | number | symbol, any>;

function createEqualityChecker(argsComparerFn?: argsComparer | null) {
	return function (...args: any[]) {
		if (args.length < 2) return true;
		const comparer = (a: any, b: any) => {
			return a === b
				? true
				: typeof argsComparerFn === 'function'
				? argsComparerFn(a, b)
				: false;
		};
		for (let i = 1; i < args.length; i++) {
			const a = args[i - 1],
				b = args[i];
			if (comparer(a, b)) continue;
			return false;
		}
		return true;
	};
}

const isEqualConstructor = createEqualityChecker(
	(a, b) => a?.constructor?.name === b?.constructor?.name
);

function isEqualDate(...args: any[]) {
	if (!isDate(...args)) return false;
	return createEqualityChecker(
		(a: Date, b: Date) => a?.valueOf() === b?.valueOf()
	)(...args);
}

/**
 * Determine if multiple arrays contain equal values recursively
 */
function isEqualArr(...args: any[]) {
	if (!isArr(...args)) return false;
	return createEqualityChecker((a: any[], b: any[]) => {
		if (a.length !== b.length) return false;
		for (let i = 0; i < a.length; i++) {
			if (a[i] === b[i]) continue;
			if (isEqualArr(a[i], b[i])) continue;
			if (isEqualObj(a[i], b[i])) continue;
			return false;
		}
		return true;
	})(...args);
}
/**
 * Determine if multiple objects contain equal values recursively
 */
function isEqualObj(...args: any[]) {
	if (!isObj(...args) || !isEqualConstructor(...args)) return false;
	const nonCircularKeys = (obj: obj) => {
		const keys = Object.keys(obj);
		return keys.filter((key) => obj[key] !== obj);
	};
	return createEqualityChecker((a: obj, b: obj) => {
		const keys = { a: nonCircularKeys(a), b: nonCircularKeys(b) };
		if (keys.a.length !== keys.b.length) return false;
		for (const key of keys.a) {
			if (a[key] === b[key]) continue;
			if (isEqualArr(a[key], b[key])) continue;
			if (isEqualObj(a[key], b[key])) continue;
			if (isEqualDate(a[key], b[key])) continue;
			return false;
		}
		return true;
	})(...args);
}

/**
 * Determine if multiple values are equal,
 * works recursively on arrays and objects.
 */
const isEqual = createEqualityChecker(
	(a: any, b: any) => isEqualObj(a, b) || isEqualArr(a, b)
);

export { isEqual, isEqualConstructor, isEqualArr, isEqualObj };
