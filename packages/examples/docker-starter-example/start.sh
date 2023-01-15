#!/bin/bash

cd /app
# Inject environment variables to index.html
./import-meta-env-alpine -x .env.example -p dist/index.html || exit 1

cd /app/dist
nginx -g "daemon off;"
