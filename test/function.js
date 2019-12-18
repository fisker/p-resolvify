import test from 'ava'
import resolvify from '../src'

test('main', async t => {
  t.is(typeof resolvify(() => {}), 'function')

  const value = Math.random()
  t.is(await resolvify(() => value)(), value)
  t.is(await resolvify(() => Promise.resolve(value))(), value)
  t.is(await resolvify(() => Promise.reject(value))(), value)
})

test('options.handler', async t => {
  const value = Math.random()
  const handler = value => value * 2
  t.is(await resolvify(() => Promise.resolve(value), {handler})(), value)
  t.is(await resolvify(() => Promise.reject(value), {handler})(), value * 2)
})

test('options.to', async t => {
  const value = Math.random()

  t.deepEqual(await resolvify(() => Promise.resolve(value), {to: true})(), [
    undefined,
    value,
  ])

  t.deepEqual(await resolvify(() => Promise.reject(value), {to: true})(), [
    value,
  ])
})

test('to shortcut', async t => {
  const value = Math.random()

  t.deepEqual(await resolvify.to(() => Promise.resolve(value))(), [
    undefined,
    value,
  ])

  t.deepEqual(await resolvify.to(() => Promise.reject(value))(), [value])
})
