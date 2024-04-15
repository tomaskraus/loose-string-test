"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_utils_1 = require("#src/string-utils");
describe('stripUnimportantWhitechars', () => {
    test('empty string', () => {
        expect((0, string_utils_1.stripUnimportantWhitechars)('')).toEqual('');
    });
    test('string without spaces', () => {
        expect((0, string_utils_1.stripUnimportantWhitechars)('abc')).toEqual('abc');
    });
    test('strips spaces', () => {
        expect((0, string_utils_1.stripUnimportantWhitechars)('ab c d')).toEqual('abcd');
    });
    test('strips spaces and eols', () => {
        expect((0, string_utils_1.stripUnimportantWhitechars)('ab c\nd')).toEqual('abcd');
    });
    test('strips spaces and eols 2', () => {
        expect((0, string_utils_1.stripUnimportantWhitechars)(' \n  ')).toEqual('');
    });
    test('preserves quoted content', () => {
        expect((0, string_utils_1.stripUnimportantWhitechars)("' a b\nc'")).toEqual("' a b\nc'");
    });
    test('preserves double quoted content', () => {
        expect((0, string_utils_1.stripUnimportantWhitechars)('" a b\nc"')).toEqual('" a b\nc"');
    });
    test('preserves quoted content more times', () => {
        expect((0, string_utils_1.stripUnimportantWhitechars)(" '( a )' '( b\n )'  ")).toEqual("'( a )''( b\n )'");
    });
    test('preserves mixed quoted content more times', () => {
        expect((0, string_utils_1.stripUnimportantWhitechars)(' \'( a )\' "( b )"  ')).toEqual('\'( a )\'"( b )"');
    });
    test('preserve spaces and eols only in matching quote pairs', () => {
        expect((0, string_utils_1.stripUnimportantWhitechars)(' "( a )\'  ')).toEqual('"( a )\'  ');
    });
    test('handles escaped quotes', () => {
        expect((0, string_utils_1.stripUnimportantWhitechars)(" '( a\\' )'  ")).toEqual("'( a' )'");
    });
    test('handles escaped double quotes', () => {
        expect((0, string_utils_1.stripUnimportantWhitechars)(' "( a\\" )"  ')).toEqual('"( a" )"');
    });
    test('handles a backslash before quotes', () => {
        expect((0, string_utils_1.stripUnimportantWhitechars)(" '( a \\\\'  ")).toEqual("'( a \\'");
    });
    test('handles a backslash before double quotes', () => {
        expect((0, string_utils_1.stripUnimportantWhitechars)(' "( a \\\\"  ')).toEqual('"( a \\"');
    });
});
//# sourceMappingURL=string-utils.test.js.map