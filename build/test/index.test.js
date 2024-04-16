"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("#src/index");
describe('general behavior', () => {
    test('true on pattern identical to the input', () => {
        expect((0, index_1.looseStringTest)('abc', 'abc')).toBeTruthy();
    });
    test('is case sensitive', () => {
        expect((0, index_1.looseStringTest)('aBc', 'abc')).toBeFalsy();
    });
    test('true on empty pattern and input', () => {
        expect((0, index_1.looseStringTest)('', '')).toBeTruthy();
    });
    test('false on a different input', () => {
        expect((0, index_1.looseStringTest)('abc', 'acc')).toBeFalsy();
    });
    test('pattern is not treated as regexp', () => {
        expect((0, index_1.looseStringTest)('^$.?*+\\[](){}', '^$.?*+\\[](){}')).toBeTruthy();
    });
});
describe('loose (unquoted) pattern', () => {
    test('true on otherwise identical input string with different leading and trailing space', () => {
        expect((0, index_1.looseStringTest)('abc', '  abc ')).toBeTruthy();
    });
    test('true regardless of different leading and trailing spaces in the pattern and the input', () => {
        expect((0, index_1.looseStringTest)(' abc  ', '   abc    ')).toBeTruthy();
    });
    test('true regardless of line breaks in the input', () => {
        expect((0, index_1.looseStringTest)(' abc  ', '   a\nbc    ')).toBeTruthy();
    });
    test('false on a longer input', () => {
        expect((0, index_1.looseStringTest)('abc', 'abcd')).toBeFalsy();
    });
});
describe('loose, does not care about whitespaces in both pattern and input', () => {
    test('true on different spacing', () => {
        expect((0, index_1.looseStringTest)('[1, 2, 3]', '[1,2 , 3 ]')).toBeTruthy();
    });
});
describe('loose, accepts quotes inside the pattern', () => {
    test('single quotes', () => {
        expect((0, index_1.looseStringTest)(" a'b'cd  ", "a'b'cd")).toBeTruthy();
    });
    test('double quotes', () => {
        expect((0, index_1.looseStringTest)(' a"b"cd  ', 'a"b"cd')).toBeTruthy();
    });
});
// ----------------------------------------------------------------
describe('exact pattern (single-quoted)', () => {
    test('true on exact match, including whitespaces', () => {
        expect((0, index_1.looseStringTest)("' abc  '", ' abc  ')).toBeTruthy();
    });
    test('false on a whitespace mismatch', () => {
        expect((0, index_1.looseStringTest)("' abc  '", ' abc ')).toBeFalsy();
    });
    test('empty exact pattern match empty input', () => {
        expect((0, index_1.looseStringTest)("''", '')).toBeTruthy();
    });
    test('empty exact pattern does not match non-empty input', () => {
        expect((0, index_1.looseStringTest)("''", ' ')).toBeFalsy();
    });
    test.skip('strips whitespaces along single quotes in the exact pattern', () => {
        expect((0, index_1.looseStringTest)("    ' abc  ' ", ' abc  ')).toBeTruthy();
    });
    test('accepts single quotes inside an exact pattern', () => {
        expect((0, index_1.looseStringTest)("' 'ab'c  '", " 'ab'c  ")).toBeTruthy();
    });
    test('accepts double quotes inside an exact pattern', () => {
        expect((0, index_1.looseStringTest)('\' "ab"c  \'', ' "ab"c  ')).toBeTruthy();
    });
});
describe('exact pattern (double-quoted)', () => {
    test('double quoted: true on exact match, including whitespaces', () => {
        expect((0, index_1.looseStringTest)('" abc  "', ' abc  ')).toBeTruthy();
    });
    test('double quoted:false on whitespace mismatch', () => {
        expect((0, index_1.looseStringTest)('" abc  "', ' abc ')).toBeFalsy();
    });
    test('double quoted: empty exact pattern match empty input', () => {
        expect((0, index_1.looseStringTest)('""', '')).toBeTruthy();
    });
    test('double quoted: empty exact pattern does not match non-empty input', () => {
        expect((0, index_1.looseStringTest)("''", ' ')).toBeFalsy();
    });
    test.skip('double quoted: strips whitespaces along double quotes', () => {
        expect((0, index_1.looseStringTest)('    " abc  " ', ' abc  ')).toBeTruthy();
    });
    test('double quoted: accepts single quotes inside', () => {
        expect((0, index_1.looseStringTest)('" \'ab\'c  "', " 'ab'c  ")).toBeTruthy();
    });
    test('double quoted: accepts double quotes inside', () => {
        expect((0, index_1.looseStringTest)('" "ab"c  "', ' "ab"c  ')).toBeTruthy();
    });
});
// ----------------------------------------------------------------
describe('(str ...) loose start-pattern: match a substring at the beginning', () => {
    test('loose-start: match if the input is the same as a start of the pattern,', () => {
        expect((0, index_1.looseStringTest)('abc ...', 'abc')).toBeTruthy();
    });
    test('loose-start: match the substring at the beginning of the input', () => {
        expect((0, index_1.looseStringTest)('abc ...', '  abcdef')).toBeTruthy();
    });
    test('loose-start: match the substring at the beginning of the input (no match)', () => {
        expect((0, index_1.looseStringTest)('abc ...', '  ab')).toBeFalsy();
    });
    test('loose-start: match the empty pattern at the beginning 1', () => {
        expect((0, index_1.looseStringTest)('...', '  abcdef')).toBeTruthy();
    });
    test('loose-start: match the empty pattern at the beginning 2', () => {
        expect((0, index_1.looseStringTest)('...', '')).toBeTruthy();
    });
    test('loose-start: does not match the not-so substring at the beginning of the input', () => {
        expect((0, index_1.looseStringTest)('abd ...', '  abcdef')).toBeFalsy();
    });
    test('loose-start: pattern: rest-mark (...) right after the expected start: match the substring at the beginning', () => {
        expect((0, index_1.looseStringTest)('abc...', 'abcdef')).toBeTruthy();
    });
    test.skip('loose-start: pattern strips leading and trailing whitespace', () => {
        expect((0, index_1.looseStringTest)('  abc ...    ', 'abcdef')).toBeTruthy();
    });
});
describe('("str" ...) exact start-pattern: match substring at the beginning', () => {
    test('exact-start: match if the input is the same as a start of the pattern', () => {
        expect((0, index_1.looseStringTest)('" abc " ...', ' abc ')).toBeTruthy();
    });
    test('exact-start: match the substring at the beginning of the input (match)', () => {
        expect((0, index_1.looseStringTest)('" abc" ...', ' abcdef')).toBeTruthy();
    });
    test('exact-start: match the substring at the beginning of the input (no match)', () => {
        expect((0, index_1.looseStringTest)('"abc" ...', ' abcdef')).toBeFalsy();
    });
    test('exact-start: match the substring at the beginning of the input (no match 2)', () => {
        expect((0, index_1.looseStringTest)('"abc" ...', 'ab')).toBeFalsy();
    });
    test('exact-start: match the empty substring at the beginning', () => {
        expect((0, index_1.looseStringTest)('"" ...', ' abcdef')).toBeTruthy();
    });
    test('exact-start: pattern rest-mark (...) right after the expected start: match the substring at the beginning', () => {
        expect((0, index_1.looseStringTest)('"abc"...', 'abcdef')).toBeTruthy();
    });
});
// ----------------------------------------------------------------
describe('multiline inputs, one-line patterns', () => {
    test('one-line loose-pattern does not match multi-line input', () => {
        const input = `abc
de`;
        expect((0, index_1.looseStringTest)('abc', input)).toBeFalsy();
    });
    test('loose-start-pattern', () => {
        const input = `[[1, 2, 3],
[4, 5, 6]]`;
        expect((0, index_1.looseStringTest)('[[1,2,3],[4, ...', input)).toBeTruthy();
    });
    test('exact-start-pattern', () => {
        const input = `[[1, 2, 3],
[4, 5, 6]]`;
        expect((0, index_1.looseStringTest)('"[[1, 2, 3" ...', input)).toBeTruthy();
    });
});
describe('loose multiline patterns', () => {
    test('loose-multiline simple pattern', () => {
        const input = `[[1, 2, 3], 
  [4, 5, 6]]`;
        expect((0, index_1.looseStringTest)('[[1,2,3],\n[4,5,6]]', input)).toBeTruthy();
    });
    test('loose-multiline pattern does not match longer inputs', () => {
        const input = `[[1, 2, 3], 
[4, 5, 6]],
[7]]`;
        expect((0, index_1.looseStringTest)('[[1,2,3],\n[4,5,6]],', input)).toBeFalsy();
    });
    test('loose-multiline start-pattern', () => {
        const input = `[[1, 2, 3], 
    [4, 5, 6]]`;
        expect((0, index_1.looseStringTest)('[[1,2,3],\n[4,5, ...', input)).toBeTruthy();
    });
});
describe('multiline patterns', () => {
    test('loose-multiline pattern', () => {
        const input = '[[1, 2, 3],\n[4, 5, 6]]';
        expect((0, index_1.looseStringTest)('"[[1, 2, 3],\n[4, 5, 6]]"', input)).toBeTruthy();
    });
    test('exact-multiline start-pattern', () => {
        const input = `[[1, 2, 3],
[4, 5, 6]]`;
        expect((0, index_1.looseStringTest)('"[[1, 2, 3],\n[4, "...', input)).toBeTruthy();
    });
});
describe('loose specials', () => {
    test("loose pattern preserves spaces in quoted areas ('inner strings')", () => {
        const objstring1 = `{
        name: 'John Doe'
    }
    `;
        expect((0, index_1.looseStringTest)("{ name: 'JohnDoe'}", objstring1)).toBeFalsy();
        expect((0, index_1.looseStringTest)("{ name: 'John Doe'}", objstring1)).toBeTruthy();
    });
    test('loose pattern preserves spaces in double quoted areas ("inner strings")', () => {
        const objstring1 = `{
        name: "John Doe"
    }
    `;
        expect((0, index_1.looseStringTest)('{ name: "JohnDoe"}', objstring1)).toBeFalsy();
        expect((0, index_1.looseStringTest)('{ name: "John Doe"}', objstring1)).toBeTruthy();
    });
    test("loose start-pattern preserves spaces in quoted areas ('inner strings')", () => {
        const objstring1 = `{
        name: 'John Doe',
        salary: 20
    }
    `;
        expect((0, index_1.looseStringTest)("{ name: 'JohnDoe'...", objstring1)).toBeFalsy();
        expect((0, index_1.looseStringTest)("{ name: 'John Doe'...", objstring1)).toBeTruthy();
    });
    test('loose start-pattern with rest-mark literal at the beginning', () => {
        expect((0, index_1.looseStringTest)('... ...', '...abcd')).toBeTruthy();
        expect((0, index_1.looseStringTest)('......', '...abcd')).toBeTruthy();
    });
});
describe('specials', () => {
    test('should we test quoted input, just add quotes', () => {
        expect((0, index_1.looseStringTest)('"Hello, world!"', '"Hello, world!"')).toBeFalsy();
        expect((0, index_1.looseStringTest)('""Hello, world!""', '"Hello, world!"')).toBeTruthy();
        expect((0, index_1.looseStringTest)(' "Hello, world!" ', '"Hello,world!"')).toBeFalsy();
    });
});
// -----------------------------------------------------------------
describe('parsePattern', () => {
    test('parses loose simple empty pattern', () => {
        const res = (0, index_1.parsePattern)('');
        expect(res.body).toEqual('');
        expect(res.stripped).toEqual('');
        expect(res.isExactPattern).toBeFalsy;
        expect(res.isStartPattern).toBeFalsy;
    });
    test('parses loose simple pattern', () => {
        const res = (0, index_1.parsePattern)(' hello "world 2" ');
        expect(res.body).toEqual(' hello "world 2" ');
        expect(res.stripped).toEqual('hello"world 2"');
        expect(res.isExactPattern).toBeFalsy;
        expect(res.isStartPattern).toBeFalsy;
    });
    test('parses loose empty start pattern', () => {
        const res = (0, index_1.parsePattern)(' ...');
        expect(res.body).toEqual('');
        expect(res.stripped).toEqual('');
        expect(res.isExactPattern).toBeFalsy;
        expect(res.isStartPattern).toBeTruthy;
    });
    test('parses loose start pattern', () => {
        const res = (0, index_1.parsePattern)(' hello "world 2" ...');
        expect(res.body).toEqual('hello "world 2"');
        expect(res.stripped).toEqual('hello"world 2"');
        expect(res.isExactPattern).toBeFalsy;
        expect(res.isStartPattern).toBeTruthy;
    });
    // ---------- ------------
    test('parses exact (singleQuoted) empty pattern', () => {
        const res = (0, index_1.parsePattern)("''");
        expect(res.body).toEqual('');
        expect(res.stripped).toEqual('');
        expect(res.isExactPattern).toBeTruthy;
        expect(res.isStartPattern).toBeFalsy;
    });
    test('parses exact (singleQuoted) pattern', () => {
        const res = (0, index_1.parsePattern)("'hello '");
        expect(res.body).toEqual('hello ');
        expect(res.stripped).toEqual('hello ');
        expect(res.isExactPattern).toBeTruthy;
        expect(res.isStartPattern).toBeFalsy;
    });
    test('parses exact (singleQuoted) empty start pattern', () => {
        const res = (0, index_1.parsePattern)("'' ...");
        expect(res.body).toEqual('');
        expect(res.stripped).toEqual('');
        expect(res.isExactPattern).toBeTruthy;
        expect(res.isStartPattern).toBeTruthy;
    });
    test('parses exact (singleQuoted) start pattern', () => {
        const res = (0, index_1.parsePattern)("'hello ' ...");
        expect(res.body).toEqual('hello ');
        expect(res.stripped).toEqual('hello ');
        expect(res.isExactPattern).toBeTruthy;
        expect(res.isStartPattern).toBeTruthy;
    });
    // ----------
    test('parses exact (doubleQuoted) empty pattern', () => {
        const res = (0, index_1.parsePattern)('""');
        expect(res.body).toEqual('');
        expect(res.stripped).toEqual('');
        expect(res.isExactPattern).toBeTruthy;
        expect(res.isStartPattern).toBeFalsy;
    });
    test('parses exact (doubleQuoted) pattern', () => {
        const res = (0, index_1.parsePattern)('"hello "');
        expect(res.body).toEqual('hello ');
        expect(res.stripped).toEqual('hello ');
        expect(res.isExactPattern).toBeTruthy;
        expect(res.isStartPattern).toBeFalsy;
    });
    test('parses exact (doubleQuoted) empty start pattern', () => {
        const res = (0, index_1.parsePattern)('"" ...');
        expect(res.body).toEqual('');
        expect(res.stripped).toEqual('');
        expect(res.isExactPattern).toBeTruthy;
        expect(res.isStartPattern).toBeTruthy;
    });
    test('parses exact (doubleQuoted) start pattern', () => {
        const res = (0, index_1.parsePattern)('"hello " ...');
        expect(res.body).toEqual('hello ');
        expect(res.stripped).toEqual('hello ');
        expect(res.isExactPattern).toBeTruthy;
        expect(res.isStartPattern).toBeTruthy;
    });
});
// -------------------------------------------------
describe('createPattern', () => {
    test('creates an empty pattern from an empty string', () => {
        expect((0, index_1.createPattern)('')).toEqual('');
    });
    test('creates the same pattern as the simple short string with no EOLs', () => {
        expect((0, index_1.createPattern)('ab c')).toEqual('ab c');
    });
    test('replaces EOLs in the input with a space', () => {
        expect((0, index_1.createPattern)('ab\nc\n d ')).toEqual('ab c  d ');
    });
    test('replaces EOLs in the input with a space (2)', () => {
        const input = `[1, 2, 3
4, 5, 6
    ]`;
        expect((0, index_1.createPattern)(input, 5)).toEqual('[1, 2 ...');
    });
});
test('replaces EOLs in the input with a space (3)', () => {
    const input = `{
"name": "Donald the Duck",
"occupation": "pond manager"
  }`;
    expect((0, index_1.createPattern)(input, 19)).toEqual('{ "name": "Donald t ...');
});
describe('createPattern (maxPatternBodyLength provided)', () => {
    test('creates an empty start pattern if maxPatternBodyLength == 0', () => {
        expect((0, index_1.createPattern)('abc', 0)).toEqual(' ...');
    });
    test('creates a start pattern from a simple short string with no EOLs', () => {
        expect((0, index_1.createPattern)('abcd', 3)).toEqual('abc ...');
    });
});
describe('createPattern exact pattern', () => {
    test('creates an exact pattern if string starts with a space', () => {
        expect((0, index_1.createPattern)(' abc')).toEqual('" abc"');
    });
    test('creates an exact start pattern if a long string starts with a space', () => {
        expect((0, index_1.createPattern)(' abcefg', 3)).toEqual('" ab" ...');
    });
    test('creates an exact pattern if a short string ends with a space', () => {
        expect((0, index_1.createPattern)('abc ')).toEqual('"abc "');
    });
    test('creates a loose start pattern if a long string ends (and not starts) with a space', () => {
        expect((0, index_1.createPattern)('abcefg ', 3)).toEqual('abc ...');
    });
});
describe('createPattern: rules', () => {
    test('creates a pattern that can loosely match the input string', () => {
        let input = '';
        expect((0, index_1.looseStringTest)((0, index_1.createPattern)(input), input)).toBeTruthy();
        input = 'abc';
        expect((0, index_1.looseStringTest)((0, index_1.createPattern)(input), input)).toBeTruthy();
        input = ' abc';
        expect((0, index_1.looseStringTest)((0, index_1.createPattern)(input), input)).toBeTruthy();
        input = ' abc ';
        expect((0, index_1.looseStringTest)((0, index_1.createPattern)(input), input)).toBeTruthy();
        input = 'abc def';
        expect((0, index_1.looseStringTest)((0, index_1.createPattern)(input), input)).toBeTruthy();
        expect((0, index_1.looseStringTest)((0, index_1.createPattern)(input, 0), input)).toBeTruthy();
        expect((0, index_1.looseStringTest)((0, index_1.createPattern)(input, 2), input)).toBeTruthy();
        input = `[1, 2, 3
      4, 5, 6
          ]`;
        expect((0, index_1.looseStringTest)((0, index_1.createPattern)(input), input)).toBeTruthy();
        expect((0, index_1.looseStringTest)((0, index_1.createPattern)(input, 3), input)).toBeTruthy();
        expect((0, index_1.looseStringTest)((0, index_1.createPattern)(input, 10), input)).toBeTruthy();
    });
});
// TODO: undecided
describe.skip('TODOs', () => {
    test('escapes EOLs in inner quotes', () => {
        const input = `{
"value": "ab
",
"type": "string"
  }`;
        expect((0, index_1.createPattern)(input, 15)).toEqual('{ "value": "ab\\n" ...');
    });
});
//# sourceMappingURL=index.test.js.map