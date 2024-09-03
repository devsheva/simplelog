type LogLevel = 'verbose' | 'debug' | 'info' | 'warn' | 'error'

type LoggerOptions = {
  level: LogLevel
}

function Logger(
  name?: string,
  options: LoggerOptions = {
    level: 'info'
  }
): ClassDecorator {
  return function (target: Function) {
    name = name ?? target.name

    const logger = {
      name,
      level: options.level
    }

    Object.defineProperty(target.prototype, 'logger', {
      value: logger
    })
  }
}

const loggerDecorator = Logger

export default Logger
export { LogLevel, loggerDecorator }
