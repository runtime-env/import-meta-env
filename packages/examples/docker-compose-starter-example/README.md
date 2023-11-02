# Setup

1. Install following packages:

   ```sh
   $ npm i -D @import-meta-env/unplugin
   $ npm i @import-meta-env/cli
   ```

1. Refer to [document](https://runtime-env.github.io/import-meta-env/guide/getting-started/introduction.html).

1. Create a [Dockerfile](./Dockerfile) file in the root of your project.

   ```Dockerfile
   FROM node:18.10.0-alpine3.15 as build-stage
   # Build import-meta-env binary for alpine linux
   RUN npx pkg ./node_modules/@import-meta-env/cli/bin/import-meta-env.js -t node18-alpine-x64 -o import-meta-env

   FROM nginx:1.22.0-alpine as production-stage
   # Remember to copy import-meta-env binary and env example file
   COPY --from=build-stage /app/import-meta-env /app/import-meta-env
   COPY .env.example.public /app/.env.example.public
   ```

1. Create a [start.sh](./start.sh) file in the root of your project.

   ```sh
   # Populate the environment variables
   ./import-meta-env -x .env.example.public
   ```

1. Create a [nginx.conf](./nginx.conf) file in the root of your project

   > See the [nginx configuration documentation](https://www.nginx.com/resources/wiki/start/topics/examples/full/) for an example of all of the possible configuration options

1. Define a service in a [Compose](./docker-compose.yml) file

   ```yml
   version: "3.9"
   services:
   web:
     build: .
     ports:
       - "8080:80"
     environment:
       - HELLO
   ```

1. Build and run your app with Compose

   ```sh
   export HELLO=docker-compose
   docker compose up
   curl localhost:8080
   # <!doctype html><html>...</html>
   ```
