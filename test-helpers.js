function reject (x) {
  return Promise.reject(x)
}

function resolve (x) {
  return Promise.resolve(x)
}

function nonPromise (x) {
  return x
}

function doubleValue (x) {
  return x * 2
}

module.exports = {
  reject,
  resolve,
  nonPromise,
  doubleValue
}