function reject (x) {
  return Promise.reject(x)
}

function nonPromise (x) {
  return x
}

function doubleValue (x) {
  return x * 2
}

module.exports = {
  reject,
  nonPromise,
  doubleValue
}