
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

# dotenv json to .env.js
if [ -e $dir/.env.js~ ]
then
  # restore env
  cp $dir/.env.js~ $dir/.env.js
else
  # backup env
  cp $dir/.env.js $dir/.env.js~
fi
sed -i '' "s/__.env__/$ENV_JSON/g" $dir/.env.js;

if [ -e $dir/.env-legacy.js ]
then
  if [ -e $dir/.env-legacy.js~ ]
  then
    cp $dir/.env-legacy.js~ $dir/.env-legacy.js
  else
    cp $dir/.env-legacy.js $dir/.env-legacy.js~
  fi
  sed -i '' "s/__.env__/$ENV_JSON/g" $dir/.env-legacy.js;
fi
