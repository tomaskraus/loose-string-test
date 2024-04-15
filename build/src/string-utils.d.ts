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
export declare const stripUnimportantWhitechars: (str: string) => string;
