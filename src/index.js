const identity = (x) => x

function resolvifyFunction(original, {handler, to}) {
  return async function (...arguments_) {
    try {
      const result = await original(...arguments_)
      return to ? [undefined, result] : result
    } catch (error) {
      const handled = handler(error)
      return to ? [handled] : handled
    }
  }
}

function resolvify(original, options) {
  options = {
    handler: identity,
    to: false,
    ...options,
  }

  if (typeof original === 'function') {
    return resolvifyFunction(original, options)
  }

  return resolvifyFunction(() => original, options)()
}

resolvify.to = function to(original) {
  return resolvify(original, {to: true})
}

export default resolvify
