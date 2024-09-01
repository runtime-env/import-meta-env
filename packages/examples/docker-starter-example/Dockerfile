FROM node:18.10.0-alpine3.15 as build-stage
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# We install packages from local for testing purposes,
# you need to list these packages in package.json and install them from npm.
COPY import-meta-env-cli-test.tgz ./
COPY import-meta-env-unplugin-test.tgz ./
RUN npm i -D import-meta-env-cli-test.tgz
RUN npm i -D import-meta-env-unplugin-test.tgz

RUN npx pkg ./node_modules/@import-meta-env/cli/bin/import-meta-env.js \
  -t node18-alpine-x64 \
  -o import-meta-env-alpine
COPY webpack.config.js .env.example ./
COPY src/* ./src/
COPY public/* ./public/
RUN npm run build

###############################################################################

FROM nginx:1.22.0-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist/* /app/dist/
COPY --from=build-stage /app/import-meta-env-alpine /app/
COPY .env.example start.sh /app/
COPY nginx.conf /etc/nginx/
ENTRYPOINT ["sh","/app/start.sh"]
