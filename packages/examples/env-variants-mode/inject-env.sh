#!/bin/bash
set -e

if [ -e dist/assets/env.js~ ]
then
  # restore env
  cp dist/assets/env.js~ dist/assets/env.js
else
  # backup env
  cp dist/assets/env.js dist/assets/env.js~
fi

# find __env__ and replace it with .env content
sd __env__ "\`$(cat .env.production)\n\`" dist/assets/env.js
