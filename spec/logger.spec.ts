import { describe, expect, expectTypeOf, it, vi } from 'vitest'

import {
  getLogLevel,
  loggerDecorator,
  LogLevel,
  LogLevelStrings
} from '../src/logger.js'

describe('logger', () => {
  it('has a logger property', () => {
    interface Test {
      logger: any
    }
    class Test {}
    loggerDecorator()(Test)

    expect(Test.prototype).toHaveProperty('logger')
  })

  it('overrides name if not provided', () => {
    interface Test {
      logger: any
    }
    class Test {}
    loggerDecorator()(Test)
  })

  it('sets name if provided', () => {
    interface Test {
      logger: any
    }
    class Test {}
    loggerDecorator('test')(Test)
    const instance = new Test()
    expect(instance.logger).toHaveProperty('name', 'test')
  })

  describe('options', () => {
    describe('level', () => {
      it('defaults to info', () => {
        interface Test {
          logger: any
        }
        class Test {}
        loggerDecorator()(Test)
        const instance = new Test()
        expect(instance.logger).toHaveProperty('level', 'info')
      })

      it('can be overridden', () => {
        interface Test {
          logger: any
        }
        class Test {}
        loggerDecorator('', { level: 'debug' })(Test)
        const instance = new Test()
        expect(instance.logger).toHaveProperty('level', 'debug')
      })
    })
  })

  describe('logLevels', () => {
    it.each(['verbose', 'debug', 'info', 'warn', 'error'])(
      `has a %s method`,
      (level) => {
        interface Test {
          logger: any
        }
        class Test {}
        loggerDecorator()(Test)
        const instance = new Test()
        expect(instance.logger).toHaveProperty(level)
        expect(instance.logger[level]).toBeInstanceOf(Function)
      }
    )

    it.each(['verbose', 'debug', 'info', 'warn', 'error'])(
      'should log a message at the specified level',
      (level) => {
        interface Test {
          logger: any
        }
        class Test {
          hello() {
            this.logger[level]('hello')
          }
        }

        loggerDecorator('test', { level: level as any })(Test)
        const testInstance = new Test()

        let consoleSpy
        if (level === 'verbose') consoleSpy = vi.spyOn(console, 'log')
        else consoleSpy = vi.spyOn(console, level as any)
        testInstance.hello()
        expect(consoleSpy).toHaveBeenCalledOnce()
      }
    )

    it('should not log a message at a lower level', () => {
      interface Test {
        logger: any
      }
      class Test {
        hello() {
          this.logger.debug('hello')
        }
      }

      loggerDecorator('test', { level: 'error' })(Test)
      const testInstance = new Test()
      const consoleSpy = vi.spyOn(console, 'debug')
      testInstance.hello()
      expect(consoleSpy).not.toHaveBeenCalled()
    })
  })
})

describe('getLogLevel', () => {
  it.each(['verbose', 'debug', 'info', 'warn', 'error'])(
    'returns the correct log level for %s',
    (level) => {
      expect(getLogLevel(level as LogLevelStrings)).toBe(
        LogLevel[level.toUpperCase() as keyof typeof LogLevel]
      )
    }
  )
})
