# simplelog

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/devsheva/simplelog/qa.yml)
[![NPM Version](https://img.shields.io/npm/v/simplelog-decorator)](https://www.npmjs.com/package/simplelog-decorator)
[![Codecov](https://img.shields.io/codecov/c/github/devsheva/simplelog)](https://app.codecov.io/github/devsheva/simplelog)

A simple logger decorator amplify like

## Important

**Experimental decorators** are used for this package implementation and since experimental it has some bugs like unsafe typing.
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
