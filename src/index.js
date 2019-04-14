import identity from './utils/identity'
import returnThis from './utils/return-this'
import isFunction from './utils/is-function'
import isThenable from './utils/is-thenable'

const toFunction = x => (isFunction(x) ? x : returnThis(x))

const resolve = (x, handler) =>
  isThenable(x) ? x.then(null, error => resolve(handler(error))) : x

function resolvify(x, handler = identity) {
  handler = toFunction(handler)

  if (isFunction(x)) {
    return function(...arguments_) {
      return resolve(x.apply(this, arguments_), handler)
    }
  }

  return resolve(x, handler)
}

export default resolvify
