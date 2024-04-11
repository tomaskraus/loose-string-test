# loose-string-test

Can test two strings for loose equality - ignoring unimportant whitespaces.

```js
// looseStringTest(pattern: string, input: string)
looseStringTest('[a,b, c ]', '[a, b,c]'); // true
```

Also does 'begins-with' tests:

```js
// looseStringTest(pattern: string, input: string)
looseStringTest('[a,b,c ...', '[a, b, c, d, e, f]'); // true
looseStringTest('[a,b,d ...', '[a, b, c, d, e, f]'); // false
```

...by having a three dots (`...`) appended to the end of its `pattern` argument value

Should we need an exact comparison, enclose the pattern value in quotes:

```js
// looseStringTest(pattern: string, input: string)
looseStringTest('"0042"', ' 0042'); // false
looseStringTest('" 0042"', ' 0042'); // true

looseStringTest("' 0042'", ' 0042'); // true
```

Whitespaces are significant in "strings in a string" loose comparison:

```js
looseStringTest('["a b","cd" ...', '["a b", "cd", " ef"]'); // true
looseStringTest('["a b","cd" ...', '["ab", "cd", " ef"]'); // false

looseStringTest('{"name":"circle 1"...', '{ "name": "circle 1", "radius": 5 }'); // true
```

Loosely tests multi-lined strings:

```js
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
```

## Installation

```bash
$ npm i loose-string-test
```

## Usage

Typescript / ES module:

```ts
import {looseStringTest} from 'loose-string-test';
```

Javascript / CommonJS:

```js
const {looseStringTest} = require('loose-string-test');
```

## About Lib

- Typed
- With `d.ts` for javascript
- Well tested, 100% code coverage
