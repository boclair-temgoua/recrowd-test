## Install docker

- Windows - [https://docs.docker.com/desktop/install/windows-install/](https://docs.docker.com/desktop/install/windows-install/)
- Mac - [https://docs.docker.com/desktop/install/mac-install/](https://docs.docker.com/desktop/install/mac-install//)

## Installation api

```bash
 cd server-api && npm install
```
## Running the app api with docker

```bash
# development
#npm run docker:dev:rebuild
npm run migration:run && npm run seed:run && npm run start:dev
# production mode
npm run start:prod
```
## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
## Installation web-app

```bash
 cd web-app && npm install
```