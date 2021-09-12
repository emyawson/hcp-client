hcp-client-pi
===========
> The front-end for HCP's Patterns and Indicators

## Overview
There are two modes in which to develop with respect to this repo (hcp-client-pi). These are:
1. "Package Mode" (this is the mode in which [hcp-client](https://git.rochedevops.accentureanalytics.com/rangle/hcp-client) will consume hcp-client-pi)
2. "Example Mode" (this is the mode in which a branch of [seed-example](https://git.rochedevops.accentureanalytics.com/rangle/seed-example), named, similarly, [_"hcp-client-pi"_](https://git.rochedevops.accentureanalytics.com/rangle/seed-example/tree/hcp-client-pi) will consume hcp-client-pi and visualize and showcase components from hcp-client-pi in isolation of [hcp-client](https://git.rochedevops.accentureanalytics.com/rangle/hcp-client))

## Getting Started
### 1. Package Mode
#### i. Cloning
To start, you will **not** need to directly clone this repository for this mode; instead, you may clone [hcp-client](https://git.rochedevops.accentureanalytics.com/rangle/hcp-client) directly with the `--recurse-submodules=packages/hcp-client-pi` option, which will clone hcp-client itself and hcp-client-pi as a "package". If you already have hcp-client cloned, you may instead use `git submodule update packages/hcp-client-pi` (from the root of the clone hcp-client) to simply pull the hcp-client-pi package in.

**Avoid** using the `--recursive` option of `git clone` since it will result in pulling **all** submodules of hcp-client (not only hcp-client-pi), which will use local versions of all of those packages, rather than using version from the nexus registry for everything else. Ultimately this means that your use of features other teams develop might not be the right versions.

This might be a little excessive for every case of "Package Mode" since teams will likely use npm packages of features other teams develop (rather than linking them as submodules), but it will also mean not having

#### ii. Installing Dependencies
Make sure that dependencies are installed for both the hcp-client root, and the hcp-client-pi by running `yarn` from the respective root of each.

#### iii. "Linking" the package for hcp-client
In package mode, you will be using a local copy of the package, and your code in hcp-client will be referencing it as if it were a node_module. To make these two things compatible, you need to run `yarn run link` from the root of hcp-client which will link all packages (submodules) as a module in node_modules.

#### iv. Start the dev server locally
The original `yarn start` of hcp-client will be insufficient if you are trying to develop in hcp-client-pi and have hcp-client consume and watch hcp-client-pi for changes. For this purpose, you will need to run `start:local`.

At this point, you should be up and running for development!

### 2. Example Mode
#### i. Cloning
To start, for example mode, you **will** need to directly clone this repo, and additionally add the `--recursive` option to `git clone`: `git clone <link to hcp-client-pi repo> --recursive`.  In this case, the example folder (which is linked as a submodule) is the only submodule and exactly what you need for development of "example mode". If you've already directly cloned hcp-client-pi, you can similarly otherwise run `git submodule upate example` from the root of the cloned hcp-client-pi.

#### ii. Installing Dependencies
Make sure that dependencies are installed for both the hcp-client-pi, and the example submodule by running yarn from each.

#### iii. "Linking" the module for the example
In example mode, you will be using a local copy of the module, and your code in the example will be referencing it as if it were a node module. To make these two things compatible, you will similarly need to run `yarn run link:example` from the root of hcp-client-pi which will link hcp-client-pi as a node module of the example.

#### iv. Starting storybook
To start the dev server, which includes storybook, and watches hcp-client-pi for changes, you now need to run `yarn start:stories` from the root of the example.

At this point, you should be up and running for development!


-----------
### TODO
* Tests
* Deployment
* Built With
* References
