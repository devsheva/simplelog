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

    Object.defineProperty(target.prototype, 'logger', {
      value: logger
    })
  }
}

const loggerDecorator = Logger

export default Logger
export { LogLevel, loggerDecorator }
