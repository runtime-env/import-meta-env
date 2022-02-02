
#!/bin/sh

dir=$(dirname $0)

# read .env
ENV=""
while read line; do
  ENV+=$line
  ENV+="\n"
done < $dir/.env

# dotenv json to env.js
if [ -e $dir/env.js~ ]
then
  # restore env
  cp $dir/env.js~ $dir/env.js
else
  # backup env
  cp $dir/env.js $dir/env.js~
fi
sed -i '' "s/__env__/\`$ENV\`/g" $dir/env.js;

if [ -e $dir/env-legacy.js ]
then
  if [ -e $dir/env-legacy.js~ ]
  then
    cp $dir/env-legacy.js~ $dir/env-legacy.js
  else
    cp $dir/env-legacy.js $dir/env-legacy.js~
  fi
  sed -i '' "s/__env__/\`$ENV\`/g" $dir/env-legacy.js;
fi
