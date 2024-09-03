import { describe, expect, it } from 'vitest'
import Base from '../src/base.js'
import { loggerDecorator } from '../src/logger.js'

describe('logger', () => {
  it('has a logger property', () => {
    class Test extends Base {}
    loggerDecorator()(Test)

    expect(Test.prototype).toHaveProperty('logger')
  })

  it('overrides name if not provided', () => {
    class Test extends Base {}
    loggerDecorator()(Test)
  })

  describe('options', () => {
    describe('level', () => {
      it('defaults to info', () => {
        class Test extends Base {}
        loggerDecorator()(Test)
        const instance = new Test()
        expect(instance.logger).toHaveProperty('level', 'info')
      })

      it('can be overridden', () => {
        class Test extends Base {}
        loggerDecorator('', { level: 'debug' })(Test)
        const instance = new Test()
        expect(instance.logger).toHaveProperty('level', 'debug')
      })
    })
  })
})
