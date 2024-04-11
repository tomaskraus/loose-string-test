"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("#src/index"));
describe('general behavior', () => {
    test('true on pattern identical to the input', () => {
        expect((0, index_1.default)('abc', 'abc')).toBeTruthy();
    });
    test('is case sensitive', () => {
        expect((0, index_1.default)('aBc', 'abc')).toBeFalsy();
    });
    test('true on empty pattern and input', () => {
        expect((0, index_1.default)('', '')).toBeTruthy();
    });
    test('false on a different input', () => {
        expect((0, index_1.default)('abc', 'acc')).toBeFalsy();
    });
    test('pattern is not treated as regexp', () => {
        expect((0, index_1.default)('^$.?*+\\[](){}', '^$.?*+\\[](){}')).toBeTruthy();
    });
});
describe('unquoted pattern', () => {
    test('true on otherwise identical input string with different leading and trailing space', () => {
        expect((0, index_1.default)('abc', '  abc ')).toBeTruthy();
    });
    test('true regardless of different leading and trailing spaces in the pattern and the input', () => {
        expect((0, index_1.default)(' abc  ', '   abc    ')).toBeTruthy();
    });
    test('true regardless of line breaks in the input', () => {
        expect((0, index_1.default)(' abc  ', '   a\nbc    ')).toBeTruthy();
    });
    test('false on a longer input', () => {
        expect((0, index_1.default)('abc', 'abcd')).toBeFalsy();
    });
});
describe('unquoted, does not care about whitespaces in both pattern and input', () => {
    test('true on different spacing', () => {
        expect((0, index_1.default)('[1, 2, 3]', '[1,2 , 3 ]')).toBeTruthy();
    });
});
describe('unquoted, accepts quotes inside the pattern', () => {
    test('single quotes', () => {
        expect((0, index_1.default)(" a'b'cd  ", "a'b'cd")).toBeTruthy();
    });
    test('double quotes', () => {
        expect((0, index_1.default)(' a"b"cd  ', 'a"b"cd')).toBeTruthy();
    });
});
// ----------------------------------------------------------------
describe('single-quoted pattern', () => {
    test('true on exact match, including whitespaces', () => {
        expect((0, index_1.default)("' abc  '", ' abc  ')).toBeTruthy();
    });
    test('false on a whitespace mismatch', () => {
        expect((0, index_1.default)("' abc  '", ' abc ')).toBeFalsy();
    });
    test('empty quoted pattern match empty input', () => {
        expect((0, index_1.default)("''", '')).toBeTruthy();
    });
    test('empty quoted pattern does not match non-empty input', () => {
        expect((0, index_1.default)("''", ' ')).toBeFalsy();
    });
    test.skip('strips whitespaces along single quotes in the pattern', () => {
        expect((0, index_1.default)("    ' abc  ' ", ' abc  ')).toBeTruthy();
    });
    test('accepts single quotes inside a quoted pattern', () => {
        expect((0, index_1.default)("' 'ab'c  '", " 'ab'c  ")).toBeTruthy();
    });
    test('accepts double quotes inside a quoted pattern', () => {
        expect((0, index_1.default)('\' "ab"c  \'', ' "ab"c  ')).toBeTruthy();
    });
});
describe('double-quoted pattern', () => {
    test('double quoted: true on exact match, including whitespaces', () => {
        expect((0, index_1.default)('" abc  "', ' abc  ')).toBeTruthy();
    });
    test('double quoted:false on whitespace mismatch', () => {
        expect((0, index_1.default)('" abc  "', ' abc ')).toBeFalsy();
    });
    test('double quoted: empty pattern match empty input', () => {
        expect((0, index_1.default)('""', '')).toBeTruthy();
    });
    test('double quoted: empty quoted pattern does not match non-empty input', () => {
        expect((0, index_1.default)("''", ' ')).toBeFalsy();
    });
    test.skip('double quoted: strips whitespaces along double quotes', () => {
        expect((0, index_1.default)('    " abc  " ', ' abc  ')).toBeTruthy();
    });
    test('double quoted: accepts single quotes inside', () => {
        expect((0, index_1.default)('" \'ab\'c  "', " 'ab'c  ")).toBeTruthy();
    });
    test('double quoted: accepts double quotes inside', () => {
        expect((0, index_1.default)('" "ab"c  "', ' "ab"c  ')).toBeTruthy();
    });
});
// ----------------------------------------------------------------
describe('(str ...) unquoted start-pattern: match a substring at the beginning', () => {
    test('unquoted-start: match if the input is the same as a start of the pattern,', () => {
        expect((0, index_1.default)('abc ...', 'abc')).toBeTruthy();
    });
    test('unquoted-start: match the substring at the beginning of the input', () => {
        expect((0, index_1.default)('abc ...', '  abcdef')).toBeTruthy();
    });
    test('unquoted-start: match the empty pattern at the beginning 1', () => {
        expect((0, index_1.default)('...', '  abcdef')).toBeTruthy();
    });
    test('unquoted-start: match the empty pattern at the beginning 2', () => {
        expect((0, index_1.default)('...', '')).toBeTruthy();
    });
    test('unquoted-start: does not match the not-so substring at the beginning of the input', () => {
        expect((0, index_1.default)('abd ...', '  abcdef')).toBeFalsy();
    });
    test('unquoted-start: pattern: rest-mark (...) right after the expected start: match the substring at the beginning', () => {
        expect((0, index_1.default)('abc...', 'abcdef')).toBeTruthy();
    });
    test.skip('unquoted-start: pattern strips leading and trailing whitespace', () => {
        expect((0, index_1.default)('  abc ...    ', 'abcdef')).toBeTruthy();
    });
});
describe('("str" ...) quoted start-pattern: match substring at the beginning', () => {
    test('quoted-start: match if the input is the same as a start of the pattern', () => {
        expect((0, index_1.default)('" abc " ...', ' abc ')).toBeTruthy();
    });
    test('quoted-start: match the substring at the beginning of the input (match)', () => {
        expect((0, index_1.default)('" abc" ...', ' abcdef')).toBeTruthy();
    });
    test('quoted-start: match the substring at the beginning of the input (no match)', () => {
        expect((0, index_1.default)('"abc" ...', ' abcdef')).toBeFalsy();
    });
    test('quoted-start: match the empty substring at the beginning', () => {
        expect((0, index_1.default)('"" ...', ' abcdef')).toBeTruthy();
    });
    test('quoted-start: pattern rest-mark (...) right after the expected start: match the substring at the beginning', () => {
        expect((0, index_1.default)('"abc"...', 'abcdef')).toBeTruthy();
    });
});
// ----------------------------------------------------------------
describe('multiline inputs, one-line patterns', () => {
    test('one-line unquoted-pattern does not match multi-line input', () => {
        const input = `abc
de`;
        expect((0, index_1.default)('abc', input)).toBeFalsy();
    });
    test('unquoted-start-pattern', () => {
        const input = `[[1, 2, 3],
[4, 5, 6]]`;
        expect((0, index_1.default)('[[1,2,3],[4, ...', input)).toBeTruthy();
    });
    test('quoted-start-pattern', () => {
        const input = `[[1, 2, 3],
[4, 5, 6]]`;
        expect((0, index_1.default)('"[[1, 2, 3" ...', input)).toBeTruthy();
    });
});
describe('unquoted multiline patterns', () => {
    test('unquoted-multiline simple pattern', () => {
        const input = `[[1, 2, 3], 
  [4, 5, 6]]`;
        expect((0, index_1.default)('[[1,2,3],\n[4,5,6]]', input)).toBeTruthy();
    });
    test('unquoted-multiline pattern does not match longer inputs', () => {
        const input = `[[1, 2, 3], 
[4, 5, 6]],
[7]]`;
        expect((0, index_1.default)('[[1,2,3],\n[4,5,6]],', input)).toBeFalsy();
    });
    test('unquoted-multiline start-pattern', () => {
        const input = `[[1, 2, 3], 
    [4, 5, 6]]`;
        expect((0, index_1.default)('[[1,2,3],\n[4,5, ...', input)).toBeTruthy();
    });
});
describe('quoted multiline patterns', () => {
    test('quoted-multiline pattern', () => {
        const input = '[[1, 2, 3],\n[4, 5, 6]]';
        expect((0, index_1.default)('"[[1, 2, 3],\n[4, 5, 6]]"', input)).toBeTruthy();
    });
    test('quoted-multiline start-pattern', () => {
        const input = `[[1, 2, 3],
[4, 5, 6]]`;
        expect((0, index_1.default)('"[[1, 2, 3],\n[4, "...', input)).toBeTruthy();
    });
});
describe('unquoted specials', () => {
    test("unquoted pattern preserves spaces in quoted areas ('inner strings')", () => {
        const objstring1 = `{
        name: 'John Doe'
    }
    `;
        expect((0, index_1.default)("{ name: 'JohnDoe'}", objstring1)).toBeFalsy();
        expect((0, index_1.default)("{ name: 'John Doe'}", objstring1)).toBeTruthy();
    });
    test('unquoted pattern preserves spaces in double quoted areas ("inner strings")', () => {
        const objstring1 = `{
        name: "John Doe"
    }
    `;
        expect((0, index_1.default)('{ name: "JohnDoe"}', objstring1)).toBeFalsy();
        expect((0, index_1.default)('{ name: "John Doe"}', objstring1)).toBeTruthy();
    });
    test("unquoted start-pattern preserves spaces in quoted areas ('inner strings')", () => {
        const objstring1 = `{
        name: 'John Doe',
        salary: 20
    }
    `;
        expect((0, index_1.default)("{ name: 'JohnDoe'...", objstring1)).toBeFalsy();
        expect((0, index_1.default)("{ name: 'John Doe'...", objstring1)).toBeTruthy();
    });
    test('unquoted start-pattern with rest-mark literal at the beginning', () => {
        expect((0, index_1.default)('... ...', '...abcd')).toBeTruthy();
        expect((0, index_1.default)('......', '...abcd')).toBeTruthy();
    });
});
describe('specials', () => {
    test('should we test quoted input, just add quotes', () => {
        expect((0, index_1.default)('"Hello, world!"', '"Hello, world!"')).toBeFalsy();
        expect((0, index_1.default)('""Hello, world!""', '"Hello, world!"')).toBeTruthy();
        expect((0, index_1.default)(' "Hello, world!" ', '"Hello,world!"')).toBeFalsy();
    });
});
//# sourceMappingURL=index.test.js.map