"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPattern = exports.parsePattern = exports.looseStringTest = exports.DEFAULT_MAX_PATTERN_BODY_LENGTH = exports.REST_MARK = void 0;
const string_utils_1 = require("./string-utils");
exports.REST_MARK = '...';
exports.DEFAULT_MAX_PATTERN_BODY_LENGTH = 20;
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
const looseStringTest = (patternStr, inputStr) => {
    const p = (0, exports.parsePattern)(patternStr);
    let pattern = p.body;
    if (!p.isExactPattern) {
        // loose (start|simple)pattern
        pattern = p.stripped;
        inputStr = (0, string_utils_1.stripUnimportantWhitechars)(inputStr);
    }
    return p.isStartPattern ? inputStr.startsWith(pattern) : pattern === inputStr;
};
exports.looseStringTest = looseStringTest;
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
const parsePattern = (patternStr) => {
    let body = patternStr;
    let stripped = patternStr;
    let isExactPattern = false;
    let isStartPattern = false;
    // start-pattern test
    const lastThreeChars = patternStr.slice(-3);
    if (lastThreeChars === exports.REST_MARK) {
        body = patternStr.slice(0, -3).trim();
        isStartPattern = true;
    }
    // exact-pattern test
    if (body.length > 1 && body[0] === "'" && body.slice(-1) === "'") {
        // single quoted pattern
        isExactPattern = true;
        body = body.slice(1, -1);
    }
    else if (body.length > 1 && body[0] === '"' && body.slice(-1) === '"') {
        //double quoted pattern
        isExactPattern = true;
        body = body.slice(1, -1);
    }
    stripped = isExactPattern ? body : (0, string_utils_1.stripUnimportantWhitechars)(body);
    return { body: body, stripped, isExactPattern, isStartPattern };
};
exports.parsePattern = parsePattern;
/**
 * creates a pattern from an input string
 * @param str input string
 * @param maxPatternBodyLength a threshold for a start-pattern creation. Limits the pattern body length. Dofaults to DEFAULT_MAX_PATTERN_BODY_LENGTH
 * @returns pattern that can match the input string. If the input begins with a space, creates an exact pattern.  If the input string is short (<=maxPatternBodyLength) and ends with a space, creates an exact pattern.
 *
 * @example
 *
 * const input = `[1, 2, 3
 * 4, 5, 6]`;
 * createPattern(input, 5) //=> '[1, 2 ...'
 *
 * const input = ` Hello World!`;
 * createPattern(input) //=> '" Hello World!"'
 *
 */
const createPattern = (str, maxPatternBodyLength = exports.DEFAULT_MAX_PATTERN_BODY_LENGTH) => {
    let s = str.replace(/\n/g, ' ');
    let considerForExact = s === str && s.length > 0;
    let isLong = false;
    if (s.length > maxPatternBodyLength) {
        s = s.substring(0, maxPatternBodyLength);
        isLong = true;
    }
    if (considerForExact) {
        considerForExact = (!isLong && s.slice(-1) === ' ') || s[0] === ' ';
    }
    if (considerForExact) {
        s = `"${s}"`;
    }
    return isLong ? s + ' ' + exports.REST_MARK : s;
};
exports.createPattern = createPattern;
exports.default = exports.looseStringTest;
//# sourceMappingURL=index.js.map