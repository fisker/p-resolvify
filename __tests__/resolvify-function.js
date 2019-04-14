import 'babel-polyfill'
import resolvify from '../src'

import {resolve, reject, nonPromise, doubleValue} from '../test-helpers'

describe('test against non-promise', () => {
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

describe('test against rejected promise', () => {
  test('no resolvify', async () => {
    const error = new Error(Math.random())
    await expect(reject(error)).rejects.toThrow(error)
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

describe('test against resolved promise', () => {
  test('no resolvify', async () => {
    const value = Math.random()
    await expect(resolve(value)).resolves.toBe(value)
  })

  test('resolve with value promise throws', async () => {
    const value = Math.random()
    expect(await resolvify(resolve)(value)).toBe(value)
  })

  test('resolve with certain value', async () => {
    const value = Math.random()
    expect(await resolvify(resolve, 'not me')(value)).toBe(value)
  })

  test('resolve with handler', async () => {
    const value = Math.random()

    expect(await resolvify(resolve, doubleValue)(value)).toBe(value)
  })
})
