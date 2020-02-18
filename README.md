<img src="https://i.imgur.com/258JDQy.jpg" width="200px" >

---

[Optimism](https://optimism.io/) is a Public Benefit Corporation dedicated to scaling Ethereum in a way that enshrines fair access to public goods. Optimism is focused on implementing a production-level Optimistic Rollup implementation that integrates with the Optimistic Virtual Machine (OVM) to scale arbitrary Solidity smart contracts.

To get involved, follow us on [Twitter](https://twitter.com/optimismPBC), join our [Discord](https://discordapp.com/invite/jrnFEvq), and try out our [OVM tutorial](https://github.com/ethereum-optimism/ERC20-Example)!

`@ovm-integration-tests` is the Optimism test monorepo.
All of the core Optimism projects that this repo tests are hosted inside of the [optimism-monorepo](https://github.com/ethereum-optimism/optimism-monorepo).
Tests are organized in **this** repo in the [packages](https://github.com/ethereum-optimism/ovm-integration-tests/tree/master/packages) directory.

## Repo Status
![CI - Build, Test, Lint](https://github.com/ethereum-optimism/ovm-integration-tests/workflows/CI%20-%20Build,%20Test,%20Lint/badge.svg?branch=master) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/05852734abaf4567a864cdd19169d70b)](https://www.codacy.com/gh/ethereum-optimism/ovm-integration-tests?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ethereum-optimism/ovm-integration-tests&amp;utm_campaign=Badge_Grade)
## Contributing
Welcome! If you're looking to contribute to the future of Ethereum, you're in the right place.

### Contributing Guide and Code of Conduct
Optimism follows a [Contributing Guide and Code of Conduct](https://github.com/ethereum-optimism/ovm-integration-tests/blob/master/.github/CONTRIBUTING.md) adapted slightly from the [Contributor Covenant](https://www.contributor-covenant.org/version/1/4/code-of-conduct.html).
All contributors **must** read through this guide before contributing.
We're here to cultivate a welcoming and inclusive contributing environment, and every new contributor needs to do their part to uphold our community standards.

### Requirements and Setup
#### Cloning the Repo
Before you start working on an Optimism project, you'll need to clone our GitHub repository:

```sh
git clone git@github.com:ethereum-optimism/ovm-integration-tests.git
```

Now, enter the repository.

```sh
cd ovm-integration-tests
```

#### Node.js
Most of the projects in `ovm-integration-tests` are [`Node.js`](https://nodejs.org/en/) projects.
You'll need to install `Node.js` for your system before continuing.
All code is only confirmed to work on `Node.js v11.6`, and there are known issues on more recent versions. Please [set your Node.js version to 11.6](https://stackoverflow.com/a/23569481). 

#### Yarn
We're using a package manager called [Yarn](https://yarnpkg.com/en/).
You'll need to [install Yarn](https://yarnpkg.com/en/docs/install) before continuing.

#### Installing Dependencies
`ovm-integration-tests` projects make use of several external packages, most notably the [optimism-monorepo](https://github.com/ethereum-optimism/optimism-monorepo) packages.

Install all required packages with:

```sh
yarn install
```

### Building
`ovm-integration-tests` provides convenient tooling for building a package or set of packages.

Build all packages:

```sh
yarn run build
```

Build a specific package or set of packages:

```sh
PKGS=your,packages,here yarn run build
```

### Linting
Clean code is the best code, so we've provided tools to automatically lint your projects.

Lint all packages:

```sh
yarn run lint
```

Lint a specific package or set of packages:

```sh
PKGS=your,packages,here yarn run lint
```

#### Automatically Fixing Linting Issues
We've also provided tools to make it possible to automatically fix any linting issues.
It's much easier than trying to fix issues manually.

Fix all packages:

```sh
yarn run fix
```

Fix a specific package or set of packages:

```sh
PKGS=your,packages,here yarn run fix
```

### Running Tests
`ovm-integration-tests` projects usually makes use of a combination of [`Mocha`](https://mochajs.org/) (a testing framework) and [`Chai`](https://www.chaijs.com/) (an assertion library) for testing.

Run all tests:

```sh
yarn test
```

Run tests for a specific package or set of packages:

```sh
PKGS=your,packages,here yarn test
```

**Contributors: remember to run tests and lint before submitting a pull request!**
Linted code with passing tests makes life easier for everyone and means your contribution can get pulled into this project faster.
