import { isArr, isObj, isDate } from 'x-is-type';

export type equalityChecker = (...args: any[]) => boolean;
export type argsComparer = (a: any, b: any) => boolean;
export type argsValidator = equalityChecker;

function createEqualityChecker(
	validateArgsFn: argsValidator | null = null,
	argsComparerFn: argsComparer | null = null
) {
	return function (...args: any[]): boolean {
		if (args.length < 2) return true;
		if (typeof validateArgsFn === 'function' && !validateArgsFn(...args)) {
			return false;
		}
		const comparer = (a: any, b: any) => {
			if (a === b) return true;
			return typeof argsComparerFn === 'function'
				? argsComparerFn(a, b)
				: false;
		};
		typeof argsComparerFn === 'function'
			? argsComparerFn
			: (a: any, b: any) => a === b;
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
	null,
	(a, b) => a?.constructor?.name === b?.constructor?.name
);

const isEqualDate = createEqualityChecker(
	isDate,
	(a: Date, b: Date) => a.getTime() === b.getTime()
);

/**
 * Determine if multiple arrays contain equal values recursively
 */
function isEqualArr(...args: any[]): boolean {
	return createEqualityChecker(isArr, (a: any[], b: any[]) => {
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
function isEqualObj(...args: any[]): boolean {
	const nonCircularKeys = (obj: Object) => {
		const keys = Object.keys(obj);
		return keys.filter((key) => obj[key] !== obj);
	};
	return createEqualityChecker(
		(...args) => isObj(...args) && isEqualConstructor(...args),
		(a: Object, b: Object) => {
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
		}
	)(...args);
}

/**
 * Determine if multiple values are equal,
 * works recursively on arrays and objects.
 */
function isEqual(...args: any[]): boolean {
	return createEqualityChecker(
		null,
		(a, b) => a === b || isEqualObj(a, b) || isEqualArr(a, b)
	)(...args);
}

export { isEqual, isEqualConstructor, isEqualArr, isEqualObj };
