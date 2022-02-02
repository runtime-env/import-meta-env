
#!/bin/sh

dir=$(dirname $0)

# construct env json from .env
ENV_JSON=""
ENV_JSON+="{"
while read line; do
  KEY_VALUE_PAIR=(`echo $line | sed 's/=/\n/g'`)
  if [ ${KEY_VALUE_PAIR[0]} ]
  then
    ENV_JSON+=${KEY_VALUE_PAIR[0]}
    ENV_JSON+=":\""
    ENV_JSON+=${KEY_VALUE_PAIR[1]}
    ENV_JSON+="\","
  fi
done < $dir/.env
ENV_JSON=${ENV_JSON%,*}
ENV_JSON+="}"

# dotenv json to dotenv.js
if [ -e $dir/dotenv.js~ ]
then
  # restore env
  cp $dir/dotenv.js~ $dir/dotenv.js
else
  # backup env
  cp $dir/dotenv.js $dir/dotenv.js~
fi
sed -i '' "s/__.env__/$ENV_JSON/g" $dir/dotenv.js;

if [ -e $dir/dotenv-legacy.js ]
then
  if [ -e $dir/dotenv-legacy.js~ ]
  then
    cp $dir/dotenv-legacy.js~ $dir/dotenv-legacy.js
  else
    cp $dir/dotenv-legacy.js $dir/dotenv-legacy.js~
  fi
  sed -i '' "s/__.env__/$ENV_JSON/g" $dir/dotenv-legacy.js;
fi
