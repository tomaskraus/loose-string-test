"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripUnimportantWhitechars = void 0;
/**
 * strips spaces, tabs and eols from a string
 *
 * preserves these white chars within quote pairs, thus treats values of stringified object nicely
 * @param str a string to be stripped
 * @returns a whitespace-stripped string, with whitespaces preserved inside quotes
 *
 * @example
 *   stripSpacesSafely('[ "a b ", "cd"  ]') === '["a b ","cd"]'
 */
const stripUnimportantWhitechars = (str) => {
    //   return str.replace(/\s/g, '');
    const ESCAPE_CHAR = '\\';
    let insideQuotes = false;
    let insideDoubleQuotes = false;
    let acc = '';
    let ready = false;
    let result = '';
    for (const c of str) {
        ready = true;
        if (insideQuotes || insideDoubleQuotes) {
            // quoted mode
            if (c === ESCAPE_CHAR) {
                if (acc === ESCAPE_CHAR) {
                    acc = ''; // eat one backslash
                }
                else {
                    ready = false;
                }
            }
            if (c === "'" && insideQuotes) {
                if (acc !== ESCAPE_CHAR) {
                    insideQuotes = false; // close quotation if it is not escaped
                }
                else {
                    acc = '';
                }
            }
            if (c === '"' && insideDoubleQuotes) {
                if (acc !== ESCAPE_CHAR) {
                    insideDoubleQuotes = false;
                }
                else {
                    acc = '';
                }
            }
            acc += c;
        }
        else {
            // normal mode
            if (c === "'") {
                insideQuotes = true;
            }
            if (c === '"') {
                insideDoubleQuotes = true;
            }
            if (c !== ' ' && c !== '\n' && c !== '\t') {
                acc += c;
            }
        }
        if (ready) {
            result += acc;
            acc = '';
        }
    }
    return result;
};
exports.stripUnimportantWhitechars = stripUnimportantWhitechars;
//# sourceMappingURL=string-utils.js.map