const {looseStringTest} = require('../build/src/index');

console.log(looseStringTest('abc', ' abc  ') === true);

{
  const matrix = `[[1, 2, 3]
[4, 5, 6]]`;
  console.log(matrix);
}

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

console.log(looseStringTest('{"name":"R. Quack" ...', creatureJSON));
//=> true
console.log(looseStringTest('{"name":"R.Quack" ...', creatureJSON));
//=> false

console.log(looseStringTest('["a b","cd" ...', '[ "a b", "cd", " ef" ]'));
console.log(looseStringTest('["a b","cd" ...', '["ab", "cd", " ef"]')); // false

console.log(looseStringTest('"abc" ...', 'abcde'));
console.log(looseStringTest('a b c ...', ' abcde'));
