import {looseStringTest, parsePattern, createPattern} from '#src/index';

describe('general behavior', () => {
  test('true on pattern identical to the input', () => {
    expect(looseStringTest('abc', 'abc')).toBeTruthy();
  });

  test('is case sensitive', () => {
    expect(looseStringTest('aBc', 'abc')).toBeFalsy();
  });

  test('true on empty pattern and input', () => {
    expect(looseStringTest('', '')).toBeTruthy();
  });

  test('false on a different input', () => {
    expect(looseStringTest('abc', 'acc')).toBeFalsy();
  });

  test('pattern is not treated as regexp', () => {
    expect(looseStringTest('^$.?*+\\[](){}', '^$.?*+\\[](){}')).toBeTruthy();
  });
});

describe('loose (unquoted) pattern', () => {
  test('true on otherwise identical input string with different leading and trailing space', () => {
    expect(looseStringTest('abc', '  abc ')).toBeTruthy();
  });

  test('true regardless of different leading and trailing spaces in the pattern and the input', () => {
    expect(looseStringTest(' abc  ', '   abc    ')).toBeTruthy();
  });

  test('true regardless of line breaks in the input', () => {
    expect(looseStringTest(' abc  ', '   a\nbc    ')).toBeTruthy();
  });

  test('false on a longer input', () => {
    expect(looseStringTest('abc', 'abcd')).toBeFalsy();
  });
});

describe('loose, does not care about whitespaces in both pattern and input', () => {
  test('true on different spacing', () => {
    expect(looseStringTest('[1, 2, 3]', '[1,2 , 3 ]')).toBeTruthy();
  });
});

describe('loose, accepts quotes inside the pattern', () => {
  test('single quotes', () => {
    expect(looseStringTest(" a'b'cd  ", "a'b'cd")).toBeTruthy();
  });
  test('double quotes', () => {
    expect(looseStringTest(' a"b"cd  ', 'a"b"cd')).toBeTruthy();
  });
});

// ----------------------------------------------------------------

describe('exact pattern (single-quoted)', () => {
  test('true on exact match, including whitespaces', () => {
    expect(looseStringTest("' abc  '", ' abc  ')).toBeTruthy();
  });

  test('false on a whitespace mismatch', () => {
    expect(looseStringTest("' abc  '", ' abc ')).toBeFalsy();
  });

  test('empty exact pattern match empty input', () => {
    expect(looseStringTest("''", '')).toBeTruthy();
  });

  test('empty exact pattern does not match non-empty input', () => {
    expect(looseStringTest("''", ' ')).toBeFalsy();
  });

  test.skip('strips whitespaces along single quotes in the exact pattern', () => {
    expect(looseStringTest("    ' abc  ' ", ' abc  ')).toBeTruthy();
  });

  test('accepts single quotes inside an exact pattern', () => {
    expect(looseStringTest("' 'ab'c  '", " 'ab'c  ")).toBeTruthy();
  });

  test('accepts double quotes inside an exact pattern', () => {
    expect(looseStringTest('\' "ab"c  \'', ' "ab"c  ')).toBeTruthy();
  });
});

describe('exact pattern (double-quoted)', () => {
  test('double quoted: true on exact match, including whitespaces', () => {
    expect(looseStringTest('" abc  "', ' abc  ')).toBeTruthy();
  });

  test('double quoted:false on whitespace mismatch', () => {
    expect(looseStringTest('" abc  "', ' abc ')).toBeFalsy();
  });

  test('double quoted: empty exact pattern match empty input', () => {
    expect(looseStringTest('""', '')).toBeTruthy();
  });

  test('double quoted: empty exact pattern does not match non-empty input', () => {
    expect(looseStringTest("''", ' ')).toBeFalsy();
  });

  test.skip('double quoted: strips whitespaces along double quotes', () => {
    expect(looseStringTest('    " abc  " ', ' abc  ')).toBeTruthy();
  });

  test('double quoted: accepts single quotes inside', () => {
    expect(looseStringTest('" \'ab\'c  "', " 'ab'c  ")).toBeTruthy();
  });

  test('double quoted: accepts double quotes inside', () => {
    expect(looseStringTest('" "ab"c  "', ' "ab"c  ')).toBeTruthy();
  });
});

// ----------------------------------------------------------------

describe('(str ...) loose start-pattern: match a substring at the beginning', () => {
  test('loose-start: match if the input is the same as a start of the pattern,', () => {
    expect(looseStringTest('abc ...', 'abc')).toBeTruthy();
  });

  test('loose-start: match the substring at the beginning of the input', () => {
    expect(looseStringTest('abc ...', '  abcdef')).toBeTruthy();
  });

  test('loose-start: match the substring at the beginning of the input (no match)', () => {
    expect(looseStringTest('abc ...', '  ab')).toBeFalsy();
  });

  test('loose-start: match the empty pattern at the beginning 1', () => {
    expect(looseStringTest('...', '  abcdef')).toBeTruthy();
  });
  test('loose-start: match the empty pattern at the beginning 2', () => {
    expect(looseStringTest('...', '')).toBeTruthy();
  });

  test('loose-start: does not match the not-so substring at the beginning of the input', () => {
    expect(looseStringTest('abd ...', '  abcdef')).toBeFalsy();
  });

  test('loose-start: pattern: rest-mark (...) right after the expected start: match the substring at the beginning', () => {
    expect(looseStringTest('abc...', 'abcdef')).toBeTruthy();
  });

  test.skip('loose-start: pattern strips leading and trailing whitespace', () => {
    expect(looseStringTest('  abc ...    ', 'abcdef')).toBeTruthy();
  });
});

describe('("str" ...) exact start-pattern: match substring at the beginning', () => {
  test('exact-start: match if the input is the same as a start of the pattern', () => {
    expect(looseStringTest('" abc " ...', ' abc ')).toBeTruthy();
  });

  test('exact-start: match the substring at the beginning of the input (match)', () => {
    expect(looseStringTest('" abc" ...', ' abcdef')).toBeTruthy();
  });
  test('exact-start: match the substring at the beginning of the input (no match)', () => {
    expect(looseStringTest('"abc" ...', ' abcdef')).toBeFalsy();
  });
  test('exact-start: match the substring at the beginning of the input (no match 2)', () => {
    expect(looseStringTest('"abc" ...', 'ab')).toBeFalsy();
  });

  test('exact-start: match the empty substring at the beginning', () => {
    expect(looseStringTest('"" ...', ' abcdef')).toBeTruthy();
  });

  test('exact-start: pattern rest-mark (...) right after the expected start: match the substring at the beginning', () => {
    expect(looseStringTest('"abc"...', 'abcdef')).toBeTruthy();
  });
});

// ----------------------------------------------------------------

describe('multiline inputs, one-line patterns', () => {
  test('one-line loose-pattern does not match multi-line input', () => {
    const input = `abc
de`;
    expect(looseStringTest('abc', input)).toBeFalsy();
  });
  test('loose-start-pattern', () => {
    const input = `[[1, 2, 3],
[4, 5, 6]]`;
    expect(looseStringTest('[[1,2,3],[4, ...', input)).toBeTruthy();
  });

  test('exact-start-pattern', () => {
    const input = `[[1, 2, 3],
[4, 5, 6]]`;
    expect(looseStringTest('"[[1, 2, 3" ...', input)).toBeTruthy();
  });
});

describe('loose multiline patterns', () => {
  test('loose-multiline simple pattern', () => {
    const input = `[[1, 2, 3], 
  [4, 5, 6]]`;
    expect(looseStringTest('[[1,2,3],\n[4,5,6]]', input)).toBeTruthy();
  });

  test('loose-multiline pattern does not match longer inputs', () => {
    const input = `[[1, 2, 3], 
[4, 5, 6]],
[7]]`;
    expect(looseStringTest('[[1,2,3],\n[4,5,6]],', input)).toBeFalsy();
  });

  test('loose-multiline start-pattern', () => {
    const input = `[[1, 2, 3], 
    [4, 5, 6]]`;
    expect(looseStringTest('[[1,2,3],\n[4,5, ...', input)).toBeTruthy();
  });
});

describe('multiline patterns', () => {
  test('loose-multiline pattern', () => {
    const input = '[[1, 2, 3],\n[4, 5, 6]]';
    expect(looseStringTest('"[[1, 2, 3],\n[4, 5, 6]]"', input)).toBeTruthy();
  });

  test('exact-multiline start-pattern', () => {
    const input = `[[1, 2, 3],
[4, 5, 6]]`;
    expect(looseStringTest('"[[1, 2, 3],\n[4, "...', input)).toBeTruthy();
  });
});

describe('loose specials', () => {
  test("loose pattern preserves spaces in quoted areas ('inner strings')", () => {
    const objstring1 = `{
        name: 'John Doe'
    }
    `;
    expect(looseStringTest("{ name: 'JohnDoe'}", objstring1)).toBeFalsy();
    expect(looseStringTest("{ name: 'John Doe'}", objstring1)).toBeTruthy();
  });

  test('loose pattern preserves spaces in double quoted areas ("inner strings")', () => {
    const objstring1 = `{
        name: "John Doe"
    }
    `;
    expect(looseStringTest('{ name: "JohnDoe"}', objstring1)).toBeFalsy();
    expect(looseStringTest('{ name: "John Doe"}', objstring1)).toBeTruthy();
  });

  test("loose start-pattern preserves spaces in quoted areas ('inner strings')", () => {
    const objstring1 = `{
        name: 'John Doe',
        salary: 20
    }
    `;
    expect(looseStringTest("{ name: 'JohnDoe'...", objstring1)).toBeFalsy();
    expect(looseStringTest("{ name: 'John Doe'...", objstring1)).toBeTruthy();
  });

  test('loose start-pattern with rest-mark literal at the beginning', () => {
    expect(looseStringTest('... ...', '...abcd')).toBeTruthy();
    expect(looseStringTest('......', '...abcd')).toBeTruthy();
  });
});

describe('specials', () => {
  test('should we test quoted input, just add quotes', () => {
    expect(looseStringTest('"Hello, world!"', '"Hello, world!"')).toBeFalsy();
    expect(
      looseStringTest('""Hello, world!""', '"Hello, world!"')
    ).toBeTruthy();
    expect(looseStringTest(' "Hello, world!" ', '"Hello,world!"')).toBeFalsy();
  });
});

// -----------------------------------------------------------------

describe('parsePattern', () => {
  test('parses loose simple empty pattern', () => {
    const res = parsePattern('');
    expect(res.body).toEqual('');
    expect(res.stripped).toEqual('');
    expect(res.isExactPattern).toBeFalsy;
    expect(res.isStartPattern).toBeFalsy;
  });

  test('parses loose simple pattern', () => {
    const res = parsePattern(' hello "world 2" ');
    expect(res.body).toEqual(' hello "world 2" ');
    expect(res.stripped).toEqual('hello"world 2"');
    expect(res.isExactPattern).toBeFalsy;
    expect(res.isStartPattern).toBeFalsy;
  });

  test('parses loose empty start pattern', () => {
    const res = parsePattern(' ...');
    expect(res.body).toEqual('');
    expect(res.stripped).toEqual('');
    expect(res.isExactPattern).toBeFalsy;
    expect(res.isStartPattern).toBeTruthy;
  });

  test('parses loose start pattern', () => {
    const res = parsePattern(' hello "world 2" ...');
    expect(res.body).toEqual('hello "world 2"');
    expect(res.stripped).toEqual('hello"world 2"');
    expect(res.isExactPattern).toBeFalsy;
    expect(res.isStartPattern).toBeTruthy;
  });

  // ---------- ------------

  test('parses exact (singleQuoted) empty pattern', () => {
    const res = parsePattern("''");
    expect(res.body).toEqual('');
    expect(res.stripped).toEqual('');
    expect(res.isExactPattern).toBeTruthy;
    expect(res.isStartPattern).toBeFalsy;
  });

  test('parses exact (singleQuoted) pattern', () => {
    const res = parsePattern("'hello '");
    expect(res.body).toEqual('hello ');
    expect(res.stripped).toEqual('hello ');
    expect(res.isExactPattern).toBeTruthy;
    expect(res.isStartPattern).toBeFalsy;
  });

  test('parses exact (singleQuoted) empty start pattern', () => {
    const res = parsePattern("'' ...");
    expect(res.body).toEqual('');
    expect(res.stripped).toEqual('');
    expect(res.isExactPattern).toBeTruthy;
    expect(res.isStartPattern).toBeTruthy;
  });

  test('parses exact (singleQuoted) start pattern', () => {
    const res = parsePattern("'hello ' ...");
    expect(res.body).toEqual('hello ');
    expect(res.stripped).toEqual('hello ');
    expect(res.isExactPattern).toBeTruthy;
    expect(res.isStartPattern).toBeTruthy;
  });

  // ----------

  test('parses exact (doubleQuoted) empty pattern', () => {
    const res = parsePattern('""');
    expect(res.body).toEqual('');
    expect(res.stripped).toEqual('');
    expect(res.isExactPattern).toBeTruthy;
    expect(res.isStartPattern).toBeFalsy;
  });

  test('parses exact (doubleQuoted) pattern', () => {
    const res = parsePattern('"hello "');
    expect(res.body).toEqual('hello ');
    expect(res.stripped).toEqual('hello ');
    expect(res.isExactPattern).toBeTruthy;
    expect(res.isStartPattern).toBeFalsy;
  });

  test('parses exact (doubleQuoted) empty start pattern', () => {
    const res = parsePattern('"" ...');
    expect(res.body).toEqual('');
    expect(res.stripped).toEqual('');
    expect(res.isExactPattern).toBeTruthy;
    expect(res.isStartPattern).toBeTruthy;
  });

  test('parses exact (doubleQuoted) start pattern', () => {
    const res = parsePattern('"hello " ...');
    expect(res.body).toEqual('hello ');
    expect(res.stripped).toEqual('hello ');
    expect(res.isExactPattern).toBeTruthy;
    expect(res.isStartPattern).toBeTruthy;
  });
});

// -------------------------------------------------

describe('createPattern', () => {
  test('creates an empty pattern from an empty string', () => {
    expect(createPattern('')).toEqual('');
  });

  test('creates the same pattern as the simple short string with no EOLs', () => {
    expect(createPattern('ab c')).toEqual('ab c');
  });

  test('replaces EOLs in the input with a space', () => {
    expect(createPattern('ab\nc\n d ')).toEqual('ab c  d ');
  });

  test('replaces EOLs in the input with a space (2)', () => {
    const input = `[1, 2, 3
4, 5, 6
    ]`;
    expect(createPattern(input, 5)).toEqual('[1, 2 ...');
  });
});

test('replaces EOLs in the input with a space (3)', () => {
  const input = `{
"name": "Donald the Duck",
"occupation": "pond manager"
  }`;
  expect(createPattern(input, 19)).toEqual('{ "name": "Donald t ...');
});

describe('createPattern (maxPatternBodyLength provided)', () => {
  test('creates an empty start pattern if maxPatternBodyLength == 0', () => {
    expect(createPattern('abc', 0)).toEqual(' ...');
  });

  test('creates a start pattern from a simple short string with no EOLs', () => {
    expect(createPattern('abcd', 3)).toEqual('abc ...');
  });
});

describe('createPattern exact pattern', () => {
  test('creates an exact pattern if string starts with a space', () => {
    expect(createPattern(' abc')).toEqual('" abc"');
  });

  test('creates an exact start pattern if a long string starts with a space', () => {
    expect(createPattern(' abcefg', 3)).toEqual('" ab" ...');
  });

  test('creates an exact pattern if a short string ends with a space', () => {
    expect(createPattern('abc ')).toEqual('"abc "');
  });

  test('creates a loose start pattern if a long string ends (and not starts) with a space', () => {
    expect(createPattern('abcefg ', 3)).toEqual('abc ...');
  });
});

describe('createPattern: rules', () => {
  test('creates a pattern that can loosely match the input string', () => {
    let input = '';

    expect(looseStringTest(createPattern(input), input)).toBeTruthy();

    input = 'abc';
    expect(looseStringTest(createPattern(input), input)).toBeTruthy();

    input = ' abc';
    expect(looseStringTest(createPattern(input), input)).toBeTruthy();

    input = ' abc ';
    expect(looseStringTest(createPattern(input), input)).toBeTruthy();

    input = 'abc def';
    expect(looseStringTest(createPattern(input), input)).toBeTruthy();
    expect(looseStringTest(createPattern(input, 0), input)).toBeTruthy();
    expect(looseStringTest(createPattern(input, 2), input)).toBeTruthy();

    input = `[1, 2, 3
      4, 5, 6
          ]`;
    expect(looseStringTest(createPattern(input), input)).toBeTruthy();
    expect(looseStringTest(createPattern(input, 3), input)).toBeTruthy();
    expect(looseStringTest(createPattern(input, 10), input)).toBeTruthy();
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
    expect(createPattern(input, 15)).toEqual('{ "value": "ab\\n" ...');
  });
});
