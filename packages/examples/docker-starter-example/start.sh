#!/bin/bash
set -e

cd /app
./import-meta-env -x .env.example.public

cd /app/dist
nginx -g "daemon off;"
