#!/bin/bash
set -e

cd /app
./final-env --example .env.example.public

cd /app/dist
nginx -g "daemon off;"
