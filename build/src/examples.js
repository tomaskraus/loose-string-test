"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const string_utils_1 = require("./string-utils");
console.log((0, index_1.looseStringTest)('abc', ' abc  ') === true);
{
    const matrix = `[[1, 2, 3]
[4, 5, 6]]`;
    console.log(matrix);
}
console.log('---');
console.log((0, string_utils_1.stripSpacesSafely)('[ "a b ", "cd"  ]'));
console.log((0, string_utils_1.stripSpacesSafely)('[ "a b ", "cd"  ]') === '["a b ","cd"]');
console.log('---');
const creature = {
    name: 'R. Quack',
    species: 'duck',
};
const creatureJSON = JSON.stringify(creature, null, '    ');
console.log(creatureJSON);
//=> {
//     "name": "R. Quack",
//     "species": "duck"
//   }
console.log((0, index_1.looseStringTest)('{"name":"R. Quack" ...', creatureJSON));
//=> true
console.log((0, index_1.looseStringTest)('{"name":"R.Quack" ...', creatureJSON));
//=> false
//# sourceMappingURL=examples.js.map