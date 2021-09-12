## Rangle HCP Client
App was bootstrapped using `create-react-app` and has **not been ejected** to continue receiving updates.

Stack:

- React (16.0.0)
- Redux (3.7.2)
- Redux-observable (0.16.0)
- React router v4
- React router redux

Prerequisites:

- Node (8.1 or higher)
- Yarn (1 or higher)

# Index
 1. [ARCHITECTURE](https://git.rochedevops.accentureanalytics.com/rangle/hcp-client/raw/master/docs/ARCHITECTURE.md)
 2. [DEVOPS](https://git.rochedevops.accentureanalytics.com/rangle/hcp-client/raw/master/docs/DEVOPS.md)
 3. [RELEASE MANAGEMENT](https://git.rochedevops.accentureanalytics.com/rangle/hcp-client/raw/master/docs/RELEASE_MANAGEMENT.md)

 
# QUICK START

1. Run the command `yarn` to install your dependencies
2. Run `yarn start` to start up to the local server
3. Fork a local copy of `https://git.rochedevops.accentureanalytics.com/rangle/hcp-middleware`
4. Follow the instructions there to get the server running

# Configuration
Each project must contain a `.env` file that contains the environment setup for their project.
A `.env` file consists of:

####static
```
NODE_PATH=./
REACT_APP_VERSION=x.x.x
REACT_APP_HCP_ENV= local | development | staging | production
```
####dynamic
```
REACT_APP_API_VERSION=v1
REACT_APP_API_ROOT=api
REACT_APP_GIGYA_TOKEN=<key>
REACT_APP_BACKEND_GIGYA_TOKEN=<key>
REACT_APP_BACKEND_PATIENT_GIGYA_TOKEN=<key>
```

Our build consists of partially static and dynamic configuration variables. Some are baked into the build (through `process.env.<STATIC>`) and some are dynamically loaded off of `window.__REACT_APP__`. NGINX injects the dynamic variables at runtime so 1 build can run against multiple versions of the backend, or different Gigya instances.

**The dynamic variables are not available at build time.**

**Note**: You can run `yarn set-version` to inject the version into your `.env` file
# Quick links
