import {escapeRegExp, stripUnimportantWhitechars} from './string-utils';

export const REST_MARK = '...';

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
  const p = parsePattern(patternStr);
  let pattern = p.body;

  if (p.isExactPattern) {
    return p.isStartPattern
      ? inputStr.startsWith(pattern)
      : pattern === inputStr;
  }

  // loose (start|simple)pattern
  pattern = p.stripped;
  inputStr = stripUnimportantWhitechars(inputStr);

  // comparison
  pattern = escapeRegExp(pattern);
  pattern = `^${pattern}${p.isStartPattern ? '.*' : '$'}`;
  const re = new RegExp(pattern);
  return re.test(inputStr);
};

export const parsePattern = (patternStr: string) => {
  let body = patternStr;
  let stripped = patternStr;

  let isExactPattern = false;
  let isStartPattern = false;

  // start-pattern test
  const lastThreeChars = patternStr.slice(-3);
  if (lastThreeChars === REST_MARK) {
    body = patternStr.slice(0, -3).trim();
    isStartPattern = true;
  }

  // exact-pattern test
  if (body.length > 1 && body[0] === "'" && body.slice(-1) === "'") {
    // single quoted pattern
    isExactPattern = true;
    body = body.slice(1, -1);
  } else if (body.length > 1 && body[0] === '"' && body.slice(-1) === '"') {
    //double quoted pattern
    isExactPattern = true;
    body = body.slice(1, -1);
  }

  stripped = isExactPattern ? body : stripUnimportantWhitechars(body);
  return {body: body, stripped, isExactPattern, isStartPattern};
};

export default looseStringTest;
