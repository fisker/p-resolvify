
const resolvify = require('./')

function aFunctionMaybeReject(randomNumber) {
  return randomNumber > .5 ? Promise.resolve(true) : Promise.reject(false)
}

const alwaysResolve = resolvify(aFunctionMaybeReject)

setInterval(async () => {
  let randomNumber = Math.random()
  const promise = resolvify(aFunctionMaybeReject(randomNumber))
  console.log(
    randomNumber > .5,
    'function: ' + await alwaysResolve(randomNumber),
    'promise: ' + await promise
  )
}, 2000)