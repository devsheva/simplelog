import { describe, expectTypeOf, it } from 'vitest'
import Base from '../src/base.ts'

describe('base', () => {
  it('has a logger property', () => {
    const base = new Base()
    expectTypeOf(base).toHaveProperty('logger').toBeAny()
  })
})
