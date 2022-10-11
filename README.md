## Install docker

- Windows - [https://docs.docker.com/desktop/install/windows-install/](https://docs.docker.com/desktop/install/windows-install/)
- Mac - [https://docs.docker.com/desktop/install/mac-install/](https://docs.docker.com/desktop/install/mac-install//)

## Installation api

```bash
 cd server-api && npm install
```
## Running the app api

```bash
# development
npm run start:dev

# production mode
npm run start:prod
```
## Running the app api with docker

```bash
# development
docker:dev:rebuild

# production mode
npm run start:prod
```

## Migrations

```bash
# Create a migration
npm run migration:create --name="foo"

# Generate a migration from schema changes
npm run migration:generate --name="bar"

# Run migrations and checks for schema changes
npm run migration:run

# Revert migrations
npm run migration:revert
```

## Seeds

```bash
# Run seeds
npm run seed:run

# Generate seeds
npm run seed:create --name="Seeds"
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
 cd web && npm install
```