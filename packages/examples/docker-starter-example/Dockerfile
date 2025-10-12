FROM node:22.16.0-alpine3.20 as build-stage
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
# We install packages from local for testing purposes,
# you need to list these packages in package.json and install them from npm.
COPY import-meta-env-cli-test.tgz ./
COPY import-meta-env-unplugin-test.tgz ./
RUN npm i -D import-meta-env-cli-test.tgz
RUN npm i -D import-meta-env-unplugin-test.tgz
COPY webpack.config.js .env.example ./
COPY src/* ./src/
COPY public/* ./public/
RUN npm run build

# Creating a single executable application
RUN echo '{ "main": "node_modules/@import-meta-env/cli/bin/import-meta-env.js", "output": "sea-prep.blob" }' > sea-config.json
RUN node --experimental-sea-config sea-config.json
RUN cp $(command -v node) import-meta-env-alpine
RUN npx postject import-meta-env-alpine NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2

###############################################################################

FROM nginx:1.27.3-alpine3.20 as production-stage
RUN apk add libstdc++
RUN mkdir /app
COPY --from=build-stage /app/dist/* /app/dist/
COPY --from=build-stage /app/import-meta-env-alpine /app/
COPY .env.example start.sh /app/
COPY nginx.conf /etc/nginx/
ENTRYPOINT ["sh","/app/start.sh"]
