# create-temp-directory
[![npm version](https://badge.fury.io/js/create-temp-directory.svg)](https://www.npmjs.com/package/create-temp-directory)

Create an empty, unique directory in the current OS's temp directory.
It returns an absolute `path` and a `remove()` function. Useful for tests.

## Getting started

Install the library as a `devDependency` in an existing project:
```
yarn add create-temp-directory --dev
```

## Example usage

```ts
import { createTempDirectory, ITempDirectory } from 'create-temp-directory'

describe('test suite', () => {
    let tempDir: ITempDirectory

    beforeEach(async () => {
        tempDir = await createTempDirectory()
    })
    afterEach(async () => {
        await tempDir.remove()
    })

    it('some test', () => {
        const tempFilePath = path.join(tempDir.path, 'temp-file')
        // the rest of the test...
    })
})
```

*NOTE: The above example is written using TypeScript. In pure JavaScript, you do not need to import/use `ITempDirectory`.*

## License

MIT
