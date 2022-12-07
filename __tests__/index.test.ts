import { describe, expect, test } from '@jest/globals';
import * as x from '../src';

function createTest(
    name: keyof typeof x,
    expectedTrueArgs: [unknown, unknown][],
    expectedFalseArgs: [unknown, unknown][]
) {
    const checkEquality = x[name];
    const onUnexpected = (a: unknown, b: unknown, result: boolean) => {
        console.log(
            `unexpected result: ${name}(${a || String(a)},${
                b || String(b)
            }) === ${result}`
        );
    };
    describe(name, () => {
        test('arguments that should return true', () => {
            for (const [a, b] of expectedTrueArgs) {
                const result = checkEquality(a, b);
                if (result !== true) onUnexpected(a, b, result);
                expect(result).toBe(true);
            }
        });
        test('arguments that should return false', () => {
            for (const [a, b] of expectedFalseArgs) {
                const result = checkEquality(a, b);
                if (result !== false) onUnexpected(a, b, result);
                expect(result).toBe(false);
            }
        });
    });
}

createTest(
    'isEqual',
    [
        [1, 1],
        ['test', 'test'],
        [null, null],
    ],
    [
        [1, 2],
        ['a', 'b'],
        [undefined, null],
    ]
);

const arr = [1, 2, 3];
createTest(
    'isEqualArr',
    [
        [arr, arr],
        [[arr], [arr]],
        [[], []],
        [
            [1, 2, [1, 2]],
            [1, 2, [1, 2]],
        ],
        [[{ id: 1 }], [{ id: 1 }]],
    ],
    [
        [1, [1]],
        [[1], []],
        [[1], [2]],
        [[{ id: 1 }], [{ id: 2 }]],
    ]
);
const obj = { a: 1 };
createTest(
    'isEqualObj',
    [
        [obj, obj],
        [{ obj }, { obj }],
        [obj, { ...obj }],
        [{ items: [1, 2, 3] }, { items: [1, 2, 3] }],
        [{ a: { b: { c: 'd' } } }, { a: { b: { c: 'd' } } }],
    ],
    [
        [1, { a: 1 }],
        [{ a: 1 }, { a: 2 }],
        [{ a: 1 }, { a: 1, b: 1 }],
        [{ items: [1, 2, 3] }, { items: [1, 2, 4] }],
        [{ a: { b: { c: 'd' } } }, { a: { b: { c: 'e' } } }],
    ]
);
