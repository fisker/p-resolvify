/* resolvify by fisker https://github.com/fisker/p-resolvify */

;(function(factory) {
  const root = Function('return this')()
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return factory()
    })
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.resolvify = factory()
  }
})(function() {
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

  return resolvify
})
