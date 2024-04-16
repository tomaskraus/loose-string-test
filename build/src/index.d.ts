export declare const REST_MARK = "...";
export declare const DEFAULT_MAX_PATTERN_BODY_LENGTH = 20;
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
export declare const looseStringTest: (patternStr: string, inputStr: string) => boolean;
/**
 * Provides information about the pattern.
 * @param patternStr pattern
 * @returns information object
 *
 * @example
 * parsePattern('abcd ')
 * // {
 * //   body: 'abc d ',
 * //   stripped: 'abcd',
 * //   isExactPattern: false,
 * //   isStartPattern: false
 * // }
 */
export declare const parsePattern: (patternStr: string) => {
    body: string;
    stripped: string;
    isExactPattern: boolean;
    isStartPattern: boolean;
};
/**
 * creates a loose pattern from an input string
 * @param str input string
 * @param maxPatternBodyLength a threshold for a start-pattern creation. Limits the pattern body length. Dofaults to DEFAULT_MAX_PATTERN_BODY_LENGTH
 * @returns loose patern that can match the input string
 *
 * @example
 *
 * const input = `[1, 2, 3
 * 4, 5, 6]`;
 * createLoosePattern(input, 5) //=> '[1, 2 ...'
 *
 */
export declare const createLoosePattern: (str: string, maxPatternBodyLength?: number) => string;
export default looseStringTest;
