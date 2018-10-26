const identity = x => x
const returnThis = x => () => x
const isFunction = x => typeof x === 'function'
const toFunction = x => isFunction(x) ? x : returnThis(x)
const isThenable = x => {
  return x !== null && typeof x === 'object' && typeof x.then === 'function'
}
const resolve = (x, handler) => {
  return isThenable(x)
    ? x.then(null, err => resolve(handler(err)))
    : x
}

function resolvify (x, handler = identity) {
  handler = toFunction(handler)

  if (isFunction(x)) {
    return function () {
      return resolve(x.apply(this, arguments), handler)
    }
  }

  return resolve(x, handler)
}

module.exports = resolvify
