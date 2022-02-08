#!/bin/bash
set -e

if [ -e dist/custom-assets-dir/env.js~ ]
then
  # restore env
  cp dist/custom-assets-dir/env.js~ dist/custom-assets-dir/env.js
else
  # backup env
  cp dist/custom-assets-dir/env.js dist/custom-assets-dir/env.js~
fi

# find __env__ and replace it with .env content
sd __env__ "\`$(cat .env)\n\`" dist/custom-assets-dir/env.js
