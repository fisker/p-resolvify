# p-resolvify

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![gzip size](http://img.badgesize.io/https://unpkg.com/p-resolvify/dist/index.mjs?compression=gzip&label=gzip%20size&style=flat-square)](https://unpkg.com/p-resolvify/dist/)
[![downloads](https://img.shields.io/npm/dm/p-resolvify.svg?style=flat-square)](https://www.npmtrends.com/p-resolvify)
[![module formats: umd, cjs, and es](https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20es-green.svg?style=flat-square)](https://unpkg.com/p-resolvify/dist/)

[![Build Status](https://img.shields.io/travis/fisker/p-resolvify.svg?style=flat-square)](https://travis-ci.org/fisker/p-resolvify)
[![Code Coverage](https://img.shields.io/coveralls/github/fisker/p-resolvify.svg?style=flat-square)](https://coveralls.io/github/fisker/p-resolvify)
[![MIT License](https://img.shields.io/npm/l/p-resolvify.svg?style=flat-square)](https://github.com/fisker/p-resolvify/blob/master/license)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> Handle promise rejection like resolved

## Install

```bash
yarn add p-resolvify
```

## Usage

```js
import resolvify from 'p-resolvify'
```

```html
<script src="https://unpkg.com/p-resolvify"></script>
```

### API

#### resolvify function

```js
resolvify(function, options?)
```

return a new function returns a promise always resolve.

#### resolvify promise

```js
resolvify(promise, options?)
```

return a promise always resolve.

#### options.handler

- type: function

Promise reject error will pass through handler and then return

#### options.to

return value as array

```js
;(async () => {
  const [error, result] = await resolvify(promise, {to: true})
  console.log(error, result)
})()
```

## Examples

```js
const maybeReject = () =>
  Math.random() > 0.5
    ? Promise.resolve(true)
    : Promise.reject(new Error('error.'))
```

Before, without resolvify

```js
;(async () => {
  let result = false

  try {
    result = await maybeReject()
  } catch (err) {}

  console.log(result)
})()
```

After, with resolvify

```js
// no more try/catch

const alwaysResolve = resolvify(maybeReject)

;(async () => {
  let result = await alwaysResolve()
  console.log(result)
})()
```
