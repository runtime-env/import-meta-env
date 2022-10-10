# Setup

1.  Install [docker](https://www.docker.com/get-started)

1.  Create a [Dockerfile](./Dockerfile) file in the root of your project.

    ```Dockerfile
    FROM node:18.10.0-alpine3.15 as build-stage
    # Build import-meta-env binary for alpine linux
    RUN npx pkg ./node_modules/@import-meta-env/cli/bin/import-meta-env.js -t node16-alpine -o import-meta-env

    FROM nginx:1.22.0-alpine as production-stage
    # Remember to copy import-meta-env binary and env example file
    COPY --from=build-stage /app/import-meta-env /app/import-meta-env
    COPY .env.example.public /app/.env.example.public
    ```

1.  Create a [start.sh](./start.sh) file in the root of your project.

    ```sh
    # Populate the environment variables
    ./import-meta-env --example .env.example.public
    ```

1.  Create a [nginx.conf](./nginx.conf) file in the root of your project

    > See the [nginx configuration documentation](https://www.nginx.com/resources/wiki/start/topics/examples/full/) for an example of all of the possible configuration options

1.  Build your docker image

    ```sh
    docker build . -t my-app
    ```

1.  Run your docker image

    ```sh
    docker run -d -p 8080:80 --env HELLO=docker my-app
    curl localhost:8080
    # <!doctype html><html>...</html>
    ```
