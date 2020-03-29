# Interrogate
An app that makes your Messenger chat data into a Kahoot quiz

## Installation

Requirements: [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/), [nvm](https://github.com/creationix/nvm#installation) and [pipenv](https://pipenv.readthedocs.io/en/latest/install/#installing-pipenv).

### Getting started

```bash
cp .env.default .env  # to create your "secret" env file
nvm use  # to make sure .nvmrc is picked up.
npm install # to install local frontend dependencies.
```

### Starting application

A two-way-split terminal window setup is recommended:

Tab 1: docker-compose

- `docker-compose up --build` to start the python API, workers and required services

Tab 2:

- `nvm use` to make sure .nvmrc is picked up.
- `npm start` will run webpack-dev-server on localhost:8000 which automatically compile changes in `src/` (and hot reloads).