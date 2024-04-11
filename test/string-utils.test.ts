import {escapeRegExp, stripSpacesSafely} from '#src/string-utils';

describe('escapeRegExp', () => {
  test('escapes special chars', () => {
    expect(escapeRegExp('*')).toEqual('\\*');
    expect(escapeRegExp('^$.?*+\\[](){}')).toEqual(
      '\\^\\$\\.\\?\\*\\+\\\\\\[\\]\\(\\)\\{\\}'
    );
  });
});

describe('stripSpacesSafely', () => {
  test('empty string', () => {
    expect(stripSpacesSafely('')).toEqual('');
  });

  test('string without spaces', () => {
    expect(stripSpacesSafely('abc')).toEqual('abc');
  });

  test('strips spaces', () => {
    expect(stripSpacesSafely('ab c d')).toEqual('abcd');
  });

  test('strips spaces and eols', () => {
    expect(stripSpacesSafely('ab c\nd')).toEqual('abcd');
  });

  test('strips spaces and eols 2', () => {
    expect(stripSpacesSafely(' \n  ')).toEqual('');
  });

  test('preserves quoted content', () => {
    expect(stripSpacesSafely("' a b\nc'")).toEqual("' a b\nc'");
  });

  test('preserves double quoted content', () => {
    expect(stripSpacesSafely('" a b\nc"')).toEqual('" a b\nc"');
  });

  test('preserves quoted content more times', () => {
    expect(stripSpacesSafely(" '( a )' '( b\n )'  ")).toEqual(
      "'( a )''( b\n )'"
    );
  });

  test('preserves mixed quoted content more times', () => {
    expect(stripSpacesSafely(' \'( a )\' "( b )"  ')).toEqual(
      '\'( a )\'"( b )"'
    );
  });

  test('preserve spaces and eols only in matching quote pairs', () => {
    expect(stripSpacesSafely(' "( a )\'  ')).toEqual('"( a )\'  ');
  });

  test('handles escaped quotes', () => {
    expect(stripSpacesSafely(" '( a\\' )'  ")).toEqual("'( a' )'");
  });

  test('handles escaped double quotes', () => {
    expect(stripSpacesSafely(' "( a\\" )"  ')).toEqual('"( a" )"');
  });

  test('handles a backslash before quotes', () => {
    expect(stripSpacesSafely(" '( a \\\\'  ")).toEqual("'( a \\'");
  });

  test('handles a backslash before double quotes', () => {
    expect(stripSpacesSafely(' "( a \\\\"  ')).toEqual('"( a \\"');
  });
});
