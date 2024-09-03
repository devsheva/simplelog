enum LogLevel {
  VERBOSE = 0,
  DEBUG,
  INFO,
  WARN,
  ERROR
}

type LogLevelStrings = Lowercase<keyof typeof LogLevel>

type LoggerOptions = {
  level: LogLevelStrings
}

function getLogLevel(level: LogLevelStrings): LogLevel {
  return LogLevel[level.toUpperCase() as keyof typeof LogLevel]
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

    Object.assign(logger, {
      verbose(...args: any[]) {
        if (getLogLevel(logger.level) <= LogLevel.VERBOSE)
          console.log(`[${name}] - `, ...args)
      },
      debug(...args: any[]) {
        if (getLogLevel(logger.level) <= LogLevel.DEBUG)
          console.debug(`[${name}] - `, ...args)
      },
      info(...args: any[]) {
        if (getLogLevel(logger.level) <= LogLevel.INFO)
          console.info(`[${name}] - `, ...args)
      },
      warn(...args: any[]) {
        if (getLogLevel(logger.level) <= LogLevel.WARN)
          console.warn(`[${name}] - `, ...args)
      },
      error(...args: any[]) {
        if (getLogLevel(logger.level) <= LogLevel.ERROR)
          console.error(`[${name}] - `, ...args)
      }
    })

    Object.defineProperty(target.prototype, 'logger', {
      value: logger
    })
  }
}

const loggerDecorator = Logger

export default Logger
export { LogLevel, loggerDecorator, getLogLevel }
export type { LogLevelStrings }
