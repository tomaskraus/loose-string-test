import {escapeRegExp, stripSpacesSafely} from './string-utils';

const REST_MARK = '...';

/**
 * Tests if a given input string can match the simple pattern string.
 * That pattern string is a very simple expression, much simpler than a RegExp (see examples).
 * @param patternStr a pattern an input string is matched with
 * @param inputStr an input string
 * @returns true if there is a match between the pattern and the input string, false otherwise
 *
 * @example
 *
 *   // loose match (spaces and eols are insignificant)
 *   looseStringTest( 'abc', ' abc  ') === true
 *   looseStringTest( '[1,2,3]', '[1, 2, 3]') === true
 *
 *   // exact match (enclose the pattern in quotes)
 *   looseStringTest( '"abc"', ' abc  ') === false
 *   looseStringTest( '"abc"', 'abc') === true
 *
 *   // matches the start of the pattern
 *   looseStringTest( '"abc" ...', 'abcde') === true
 *   looseStringTest( 'a b c ...', ' abcde') === true
 */
export const looseStringTest = (patternStr: string, inputStr: string) => {
  // preparation
  let pattern = patternStr;
  let isQuotedPattern = false;
  let isStartPattern = false;

  // start-pattern test
  const lastThreeChars = pattern.slice(-3);
  if (lastThreeChars === REST_MARK) {
    pattern = pattern.slice(0, -3).trim();
    isStartPattern = true;
  }

  // quoted-pattern test
  if (pattern.length > 1 && pattern[0] === "'" && pattern.slice(-1) === "'") {
    // single quoted pattern
    isQuotedPattern = true;
    pattern = pattern.slice(1, -1);
  } else if (
    pattern.length > 1 &&
    pattern[0] === '"' &&
    pattern.slice(-1) === '"'
  ) {
    //double quoted pattern
    isQuotedPattern = true;
    pattern = pattern.slice(1, -1);
  }

  if (isQuotedPattern && !isStartPattern) {
    // quoted simple pattern
    return pattern === inputStr;
  }

  if (!isQuotedPattern) {
    // unquoted (start|simple)pattern
    pattern = stripSpacesSafely(pattern);
    inputStr = stripSpacesSafely(inputStr);
  }

  // comparison
  pattern = escapeRegExp(pattern);
  pattern = `^${pattern}${isStartPattern ? '.*' : '$'}`;
  const re = new RegExp(pattern);
  return re.test(inputStr);
};

export default looseStringTest;
