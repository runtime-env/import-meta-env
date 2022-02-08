#!/bin/bash
set -e

if [ -e custom-out-dir/assets/env.js~ ]
then
  # restore env
  cp custom-out-dir/assets/env.js~ custom-out-dir/assets/env.js
else
  # backup env
  cp custom-out-dir/assets/env.js custom-out-dir/assets/env.js~
fi

# find __env__ and replace it with .env content
sd __env__ "\`$(cat .env)\n\`" custom-out-dir/assets/env.js
