# p-resolvify
 > resolve promise rejection

## install

```sh
yarn add p-resolvify
```

## ustage
```js
import resolvify from 'p-resolvify'
```

### resolvify (x: any, handler)

#### x: Function
return a new function will return a promise always resolved.
* if orignal function not return a thenable object, new function will return the value instead of promise *

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
  return Math.random() > .5 ? Promise.reject(false) : Promise.resolve(true)
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
  return Math.random() > .5 ? Promise.reject(false) : Promise.resolve(true)
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