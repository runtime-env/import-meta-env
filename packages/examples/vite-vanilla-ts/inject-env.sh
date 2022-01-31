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
done < .env
ENV_JSON=${ENV_JSON%,*}
ENV_JSON+="}"

# inject env json to .env.js
if [ -e ./dist/assets/.env.js~ ]
then
  # restore env
  cp ./dist/assets/.env.js~ ./dist/assets/.env.js
else
  # backup env
  cp ./dist/assets/.env.js ./dist/assets/.env.js~
fi
sed -i '' "s/__RUNTIME_CONFIG__/$ENV_JSON/g" ./dist/assets/.env.js;

if [ -e ./dist/assets/.env-legacy.js ]
then
  if [ -e ./dist/assets/.env-legacy.js~ ]
  then
    cp ./dist/assets/.env-legacy.js~ ./dist/assets/.env-legacy.js
  else
    cp ./dist/assets/.env-legacy.js ./dist/assets/.env-legacy.js~
  fi
  sed -i '' "s/__RUNTIME_CONFIG__/$ENV_JSON/g" ./dist/assets/.env-legacy.js;
fi
