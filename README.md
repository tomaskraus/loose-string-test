# loose-string-test

Can test a string against a _pattern_ for loose equality - ignoring unimportant whitespaces.

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

...by having a three dots (`...`) appended to the end of its _pattern_ argument value

> Note: a _pattern_ is a simple string expression, much simpler than a RegExp. More about patterns in the [On Patterns](#on-patterns) chapter.

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
- No dependencies
- Well tested, 100% code coverage

## On Patterns

Patterns are strings, with special meaning to a `loose-string-test` library.  
Patterns can be _exact_ or _loose_, _whole_ or _partial_.

### Exact whole pattern

By enclosing whole pattern string value into quotes (either single or double ones), we'll make that string an _exact whole pattern_:

```js
// looseStringTest(pattern: string, input: string)
looseStringTest('"abc d"', 'abcd'); //=> false
looseStringTest('"abc d"', 'abc d'); //=> true
```

With the _exact whole pattern_ argument, the `looseStringTest` functions just compares the body of that pattern with the input string for a string equality.

```js
const exactWholePattern = '"search text"';
const exactWholePatternBody = 'search text';

// following function call:
looseStringTest(exactWholePattern, 'search text ');
// ... gives the same result as the expression:
exactWholePatternBody === 'search text ';
// ... i.e. false, because of trailing space at the end of the input string ('search text ')
```

### Exact Partial Pattern

By adding three dots (...) after the quoted part of the pattern string, we'll make that pattern an _exact partial pattern_:

```js
// looseStringTest(pattern: string, input: string)
looseStringTest('"abc" ...', 'abcd'); //=> true
looseStringTest('"abc" ...', 'ab'); //=> false
```

With the _exact partial pattern_ argument, the `looseStringTest` functions just perform the _startsWith_ method:

```js
const exactPartialPattern = '"search text" ...';
const exactPartialPatternBody = 'search text';

// following function call:
looseStringTest(exactPartialPattern, 'search text ');
// ... gives the same result as the expression:
'search text '.startsWith(exactPartialPatternBody);
// ... i.e. true
```

### Loose Whole Pattern

_loose whole pattern_ ignores spaces and EOLs:

```js
// looseStringTest(pattern: string, input: string)
looseStringTest('abcd', 'abcd'); //=> true
looseStringTest(' a bc d ', ' ab  cd'); //=> true
```

It strips all the unimportant space and EOL characters from both the _pattern_ and _input_ before comparing them:

```js
const looseWholePattern = ' search  text ';

// following function call:
looseStringTest(looseWholePattern, 'search text ');
// ... gives the same result as the expression:
stripUnimportantWhitechars(looseWholePattern) ===
  stripUnimportantWhitechars('search text ');
// ... true
```

The only important whitespaces are ones inside quote pairs in the loose pattern:

```js
looseStringTest(' [ "a", " b " ] ', '["a"," b "]'); // true
```

### Loose Partial Pattern

Every loose pattern that ends with three dots (...) is considered to be a _loose partial pattern_:

```js
const loosePartialPattern = 'abc ...';
```

It strips all the unimportant space and EOL characters from both the _pattern_ and _input_ before comparing them:

```js
const loosePartialPattern = ' sea ...';

// following function call:
looseStringTest(loosePartialPattern, 'search text ');
// ... gives the same result as the expression:
stripUnimportantWhitechars('search text ').startsWith(
  stripUnimportantWhitechars(loosePartialPattern)
);
// ... true
```

The only important whitespaces are ones inside quote pairs in the loose partial pattern:

```js
looseStringTest(' [ "a", " b ", .... ', '["a"," b ","c "]'); // true
```

## ParsePattern Function

Gives you information about a pattern:

```js
parsePattern('"abc"');
// {
//   body: 'abc',
//   stripped: 'abc',
//   isExactPattern: true,
//   isStartPattern: false
// }

parsePattern('["a", "b c", "d" ...');
// {
//   body: '["a", "b c", "d"',
//   stripped: '["a","b c","d"',
//   isExactPattern: false,
//   isStartPattern: true
// }
```
