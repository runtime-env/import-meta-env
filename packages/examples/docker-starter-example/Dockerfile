FROM node:18.10.0-alpine3.15 as build-stage
WORKDIR /app

COPY ./ .

RUN npm install
RUN npm run build
RUN npx pkg ./node_modules/@import-meta-env/cli/bin/import-meta-env.js -t node18-alpine -o import-meta-env

###############################################################################

FROM nginx:1.22.0-alpine as production-stage
RUN mkdir /app

COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/import-meta-env /app/import-meta-env

COPY .env.example.public /app/.env.example.public
COPY start.sh /app/start.sh
COPY nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["sh","/app/start.sh"]
