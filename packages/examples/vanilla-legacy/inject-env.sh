#!/bin/bash
set -e

if [ -e dist/assets/env.js~ ]
then
  # restore env
  cp dist/assets/env.js~ dist/assets/env.js
  cp dist/assets/env-legacy.js~ dist/assets/env-legacy.js
else
  # backup env
  cp dist/assets/env.js dist/assets/env.js~
  cp dist/assets/env-legacy.js dist/assets/env-legacy.js~
fi

# find __env__ and replace it with .env content
sd __env__ "\`$(cat .env)\n\`" dist/assets/env.js
sd __env__ "\`$(cat .env)\n\`" dist/assets/env-legacy.js
