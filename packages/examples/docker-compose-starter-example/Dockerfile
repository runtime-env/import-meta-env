FROM node:18.10.0-alpine3.15 as build-stage
WORKDIR /app

COPY ./ .

RUN npm i
RUN npm i -D import-meta-env-cli-test.tgz
RUN npm i -D import-meta-env-unplugin-test.tgz
RUN npm run build
RUN npx pkg ./node_modules/@import-meta-env/cli/bin/import-meta-env.js -t node18-alpine-x64 -o import-meta-env

###############################################################################

FROM nginx:1.22.0-alpine as production-stage
RUN mkdir /app

COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/import-meta-env /app/import-meta-env

COPY .env.example.public /app/.env.example.public
COPY start.sh /app/start.sh
COPY nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["sh","/app/start.sh"]
