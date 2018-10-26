const resolvify = require('../')
const {
  reject,
  nonPromise,
  doubleValue,
} = require('../test-helpers')

describe('test againt non-promise', () => {
  test('no resolvify', async () => {
    const value = Math.random()
    const result = await nonPromise(value)
    expect(result).toBe(value)
  })

  test('resolve with value promise throws', async () => {
    const value = Math.random()
    const result = await resolvify(nonPromise(value))
    expect(result).toBe(value)
  })

  test('resolve with certain value', async () => {
    const value = Math.random()
    const result = await resolvify(nonPromise(value), 'not me')
    expect(result).toBe(value)
  })

  test('resolve with handler', async () => {
    const value = Math.random()
    const doubled = doubleValue(value)

    const result = await resolvify(nonPromise(value), doubled)

    expect(result).toBe(value)
  })
})

describe('test againt rejected promise', () => {
  test('no resolvify', async () => {
    const err = new Error(Math.random())
    await expect(reject(err)).rejects.toThrow(err)
  })

  test('resolve with value promise throws', async () => {
    const value = Math.random()
    const rejected = reject(value)
    expect(await resolvify(rejected)).toBe(value)
  })

  test('resolve with certain value', async () => {
    const value = Math.random()
    const rejected = reject('not me')
    expect(await resolvify(rejected, value)).toBe(value)
  })

  test('resolve with handler', async () => {
    const value = Math.random()
    const doubled = doubleValue(value)

    const rejected = reject(value)
    expect(await resolvify(rejected, doubleValue)).toBe(doubled)
  })
})