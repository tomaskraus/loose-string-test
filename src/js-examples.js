const {
  looseStringTest,
  parsePattern,
  createPattern,
  REST_MARK,
  DEFAULT_MAX_PATTERN_BODY_LENGTH,
} = require('../build/src/index');

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

console.log(parsePattern('abcd '));
// {
//   body: 'abc d ',
//   stripped: 'abcd',
//   isExactPattern: false,
//   isStartPattern: false
// }
console.log(parsePattern(' [1, 2, "ab cd", ...'));
console.log(parsePattern('"abc"'));
console.log(parsePattern('"abc", ...'));
console.log(REST_MARK);
console.log(DEFAULT_MAX_PATTERN_BODY_LENGTH);
console.log(parsePattern('["a", "b c", "d" ...'));

{
  const input = `[1, 2, 3,
    4, 5, 6]`;
  createPattern(input); //=> '[1, 2, 3, 4, 5, 6]'

  // we can limit the length of a pattern body
  createPattern(input, 5); //=> '[1, 2 ...'

  //return exact whole pattern if a short input string begins with a space
  createPattern(' Hello World!'); //=> '" Hello World!"'

  //return exact whole pattern if a short input string ends with a space
  createPattern('Hello World! '); //=> '"Hello World! "'

  //return exact start-pattern if a long input string begins with a space
  createPattern(' Hello World!', 2); //=> '" He" ...'
}

{
  const input = `a
b`;
  console.log(looseStringTest(input, input));
  console.log(looseStringTest(`"${input}"`, input));
  console.log(looseStringTest('"a\nb"', input));
}

{
  const input = ' Hello World!';
  console.log(createPattern(input)); //=> '" Hello World!"'
}
