# Setup

1.  Install [docker](https://www.docker.com/get-started)

1.  Create a [Dockerfile](./Dockerfile) file in the root of your project.

    ```Dockerfile
    FROM node:latest as build-stage
    # Build final-env binary for alpine linux
    RUN npx pkg ./node_modules/@final-env/cli/bin/final-env.js -t node16-alpine -o final-env

    FROM nginx:stable-alpine as production-stage
    # Remember to copy final-env binary and env example file
    COPY --from=build-stage /app/final-env /app/final-env
    COPY .env.example.public /app/.env.example.public
    ```

1.  Create a [start.sh](./start.sh) file in the root of your project.

    ```sh
    # Populate the environment variables
    ./final-env --example .env.example.public
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
