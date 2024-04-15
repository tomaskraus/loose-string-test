import {stripUnimportantWhitechars} from '#src/string-utils';

describe('stripUnimportantWhitechars', () => {
  test('empty string', () => {
    expect(stripUnimportantWhitechars('')).toEqual('');
  });

  test('string without spaces', () => {
    expect(stripUnimportantWhitechars('abc')).toEqual('abc');
  });

  test('strips spaces', () => {
    expect(stripUnimportantWhitechars('ab c d')).toEqual('abcd');
  });

  test('strips spaces and eols', () => {
    expect(stripUnimportantWhitechars('ab c\nd')).toEqual('abcd');
  });

  test('strips spaces and eols 2', () => {
    expect(stripUnimportantWhitechars(' \n  ')).toEqual('');
  });

  test('preserves quoted content', () => {
    expect(stripUnimportantWhitechars("' a b\nc'")).toEqual("' a b\nc'");
  });

  test('preserves double quoted content', () => {
    expect(stripUnimportantWhitechars('" a b\nc"')).toEqual('" a b\nc"');
  });

  test('preserves quoted content more times', () => {
    expect(stripUnimportantWhitechars(" '( a )' '( b\n )'  ")).toEqual(
      "'( a )''( b\n )'"
    );
  });

  test('preserves mixed quoted content more times', () => {
    expect(stripUnimportantWhitechars(' \'( a )\' "( b )"  ')).toEqual(
      '\'( a )\'"( b )"'
    );
  });

  test('preserve spaces and eols only in matching quote pairs', () => {
    expect(stripUnimportantWhitechars(' "( a )\'  ')).toEqual('"( a )\'  ');
  });

  test('handles escaped quotes', () => {
    expect(stripUnimportantWhitechars(" '( a\\' )'  ")).toEqual("'( a' )'");
  });

  test('handles escaped double quotes', () => {
    expect(stripUnimportantWhitechars(' "( a\\" )"  ')).toEqual('"( a" )"');
  });

  test('handles a backslash before quotes', () => {
    expect(stripUnimportantWhitechars(" '( a \\\\'  ")).toEqual("'( a \\'");
  });

  test('handles a backslash before double quotes', () => {
    expect(stripUnimportantWhitechars(' "( a \\\\"  ')).toEqual('"( a \\"');
  });
});
