import {looseStringTest} from './index';
import {stripSpacesSafely} from './string-utils';

console.log(looseStringTest('abc', ' abc  ') === true);

{
  const matrix = `[[1, 2, 3]
[4, 5, 6]]`;
  console.log(matrix);
}

console.log('---');

console.log(stripSpacesSafely('[ "a b ", "cd"  ]'));
console.log(stripSpacesSafely('[ "a b ", "cd"  ]') === '["a b ","cd"]');

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
