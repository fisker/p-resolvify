const resolvify = require('../')
const {
  reject,
  nonPromise,
  doubleValue,
} = require('../test-helpers')

describe('test againt non-promise', () => {
  test('no resolvify', () => {
    const value = Math.random()
    expect(nonPromise(value)).toBe(value)
  })

  test('resolve with value promise throws', async () => {
    const value = Math.random()
    expect(await resolvify(nonPromise)(value)).toBe(value)
  })

  test('resolve with certain value', async () => {
    const value = Math.random()
    expect(await resolvify(nonPromise, 'not me')(value)).toBe(value)
  })

  test('resolve with handler', async () => {
    const value = Math.random()
    const doubled = doubleValue(value)

    expect(await resolvify(nonPromise, doubleValue)(value)).toBe(value)
  })
})

describe('test againt rejected promise', () => {
  test('no resolvify', async () => {
    const err = new Error(Math.random())
    await expect(reject(err)).rejects.toThrow(err)
  })

  test('resolve with value promise throws', async () => {
    const value = Math.random()
    expect(await resolvify(reject)(value)).toBe(value)
  })

  test('resolve with certain value', async () => {
    const value = Math.random()
    expect(await resolvify(reject, value)('not me')).toBe(value)
  })

  test('resolve with handler', async () => {
    const value = Math.random()
    const doubled = doubleValue(value)

    expect(await resolvify(reject, doubleValue)(value)).toBe(doubled)
  })
})