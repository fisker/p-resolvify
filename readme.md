# p-resolvify

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![gzip size](http://img.badgesize.io/https://unpkg.com/p-resolvify/lib/index.mjs?compression=gzip&label=gzip%20size&style=flat-square)](https://unpkg.com/p-resolvify/lib/)
[![downloads](https://img.shields.io/npm/dm/p-resolvify.svg?style=flat-square)](https://www.npmtrends.com/p-resolvify)
[![module formats: umd, cjs, and es](https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20es-green.svg?style=flat-square)](https://unpkg.com/p-resolvify/lib/)

[![Build Status](https://img.shields.io/travis/fisker/p-resolvify.svg?style=flat-square)](https://travis-ci.org/fisker/p-resolvify)
[![Code Coverage](https://img.shields.io/coveralls/github/fisker/p-resolvify.svg?style=flat-square)](https://coveralls.io/github/fisker/p-resolvify)
[![MIT License](https://img.shields.io/npm/l/p-resolvify.svg?style=flat-square)](https://github.com/fisker/p-resolvify/blob/master/license)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> resolve promise rejection

## install

```sh
yarn add p-resolvify
```

## ustage

```js
import resolvify from 'p-resolvify'
```

```html
<script src="https://unpkg.com/p-resolvify"></script>
```

### resolvify (x: any, handler)

#### x: Function

return a new function will return a promise always resolved.

- if orignal function not return a thenable object, new function will return the value instead of promise \*

#### x: other

if x is thenable object
return a new promise will always resolved
otherwise
return x

#### handler: function

promise reject error will pass through handler and then return

### handler: other

return promise reject value

## examples

### resolvify function

```js
function aFunctionMaybeReject() {
  return Math.random() > 0.5 ? Promise.resolve(true) : Promise.reject(false)
}

// without resolvify
;(async () => {
  let result = false

  try {
    result = await aFunctionMaybeReject
  } catch (err) {}

  console.log(result)
})()

// resolvify
// no more try/catch
;(async () => {
  const alwaysResolve = resolvify(aFunctionMaybeReject)

  let result = await alwaysResolve()
  console.log(result)
})()
```

### resolvify promise

```js
function aFunctionMaybeReject() {
  return Math.random() > 0.5 ? Promise.resolve(true) : Promise.reject(false)
}

// without resolvify
;(async () => {
  const promise = aFunctionMaybeReject()

  let result = false

  try {
    result = await promise
  } catch (err) {}

  console.log(result)
})()

// resolvify
// no more try/catch
;(async () => {
  const promise = aFunctionMaybeReject()

  let result = await resolvify(promise)

  console.log(result)
})()
```
