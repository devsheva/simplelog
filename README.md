# simplelog-decorator

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/devsheva/simplelog/qa.yml)
[![NPM Version](https://img.shields.io/npm/v/simplelog-decorator)](https://www.npmjs.com/package/simplelog-decorator)
[![Codecov](https://img.shields.io/codecov/c/github/devsheva/simplelog)](https://app.codecov.io/github/devsheva/simplelog)

A simple logger built as class decorator, amplify like.

## Quick Start

### Usage

Due to the experimental decorators feature, there are some limitations.
Starting from the preferred syntax `@Logger()`

In TypeScript you need to simply enable `experimentalDecorators: true` in your `tsconfig.json`, to be able to use the preferred syntax.

In JavaScript you need to use external libraries like [@babel/plugin-proposal-decorators](https://www.npmjs.com/package/@babel/plugin-proposal-decorators) to use the preferred syntax.

Anyway since a decorator is just a function, you can use it by importing the `loggerDecorator` method.

Arguments of logger are:

- `name`: optional, default value is name of class
- `options`:
  - `level`: default to `info`

```ts
import Logger, {loggerDecorator} from 'simplelog-decorator'

// @Logger('YourCustomClass')
// @Logger('YourCustomClass', {level: 'warn'})
// loggerDecorator()(YourClass) 
@Logger() // name will be YourClass, level info
class YourClass {
   sample_method() {
      this.logger.verbose('hi from sample_method')
      this.logger.debug('hi from sample_method')
      this.logger.info('hi from sample_method')
      this.logger.warn('hi from sample_method')
      this.logger.error('hi from sample_method')

   }
}


```

## Limitations

As previously said, **experimental decorators** are used for this package implementation and since experimental it has some bugs like `unsafe typing`.
TypeScript compiler complains when it finds out a property used inside a class that calls a decorator cause it cannot infer it, so as a temporary workaround simply declare an interface

```ts
interface Example {logger: any}

@Logger()
class Example {
   hello() {
    this.logger.debug() // THIS IS VALID
   }
}
```

## Contributing

This has been developed as a personal project, in order to be able to have an amplify-like logger as a package, without needing to install the whole amplify lib for just logging features.

But feel free to contribute by forking this project and opening a PR once done.
