#!/bin/bash
set -e

cd /app
./import-meta-env --example .env.example.public

cd /app/dist
nginx -g "daemon off;"
