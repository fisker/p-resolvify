import isObject from './is-object'
import isFunction from './is-function'

export default x => isObject(x) && isFunction(x.then)
