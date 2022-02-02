export const createDotenvShellTemplate = ({
  dotenvJsFileName,
}: {
  dotenvJsFileName: string;
}) => `
#!/bin/sh

dir=$(dirname $0)

# construct env json from .env
ENV_JSON=""
ENV_JSON+="{"
while read line; do
  KEY_VALUE_PAIR=(\`echo $line | sed 's/=/\\n/g'\`)
  if [ \${KEY_VALUE_PAIR[0]} ]
  then
    ENV_JSON+=\${KEY_VALUE_PAIR[0]}
    ENV_JSON+=":\\""
    ENV_JSON+=\${KEY_VALUE_PAIR[1]}
    ENV_JSON+="\\","
  fi
done < $dir/.env
ENV_JSON=\${ENV_JSON%,*}
ENV_JSON+="}"

# dotenv json to ${dotenvJsFileName}.js
if [ -e $dir/${dotenvJsFileName}.js~ ]
then
  # restore env
  cp $dir/${dotenvJsFileName}.js~ $dir/${dotenvJsFileName}.js
else
  # backup env
  cp $dir/${dotenvJsFileName}.js $dir/${dotenvJsFileName}.js~
fi
sed -i '' "s/__.env__/$ENV_JSON/g" $dir/${dotenvJsFileName}.js;

if [ -e $dir/${dotenvJsFileName}-legacy.js ]
then
  if [ -e $dir/${dotenvJsFileName}-legacy.js~ ]
  then
    cp $dir/${dotenvJsFileName}-legacy.js~ $dir/${dotenvJsFileName}-legacy.js
  else
    cp $dir/${dotenvJsFileName}-legacy.js $dir/${dotenvJsFileName}-legacy.js~
  fi
  sed -i '' "s/__.env__/$ENV_JSON/g" $dir/${dotenvJsFileName}-legacy.js;
fi
`;
