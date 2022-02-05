export const createDotenvShellTemplate = ({
  dotenvJsFileName,
  placeholder,
}: {
  dotenvJsFileName: string;
  placeholder: string;
}) => `#!/bin/sh

dir=$(dirname $0)

# read .env
ENV=""
while read line || [[ -n "$line" ]]; do
  ENV="\${ENV}\${line}"
  ENV="\${ENV}\\n"
done < $dir/.env

# dotenv json to ${dotenvJsFileName}.js
if [ -e $dir/${dotenvJsFileName}.js~ ]
then
  # restore env
  cp $dir/${dotenvJsFileName}.js~ $dir/${dotenvJsFileName}.js
else
  # backup env
  cp $dir/${dotenvJsFileName}.js $dir/${dotenvJsFileName}.js~
fi
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/${placeholder}/\\\`$ENV\\\`/g" $dir/${dotenvJsFileName}.js;
else
  sed -i -e "s|${placeholder}|\\\`$ENV\\\`|g" $dir/${dotenvJsFileName}.js;
fi

if [ -e $dir/${dotenvJsFileName}-legacy.js ]
then
  if [ -e $dir/${dotenvJsFileName}-legacy.js~ ]
  then
    cp $dir/${dotenvJsFileName}-legacy.js~ $dir/${dotenvJsFileName}-legacy.js
  else
    cp $dir/${dotenvJsFileName}-legacy.js $dir/${dotenvJsFileName}-legacy.js~
  fi
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/${placeholder}/\\\`$ENV\\\`/g" $dir/${dotenvJsFileName}-legacy.js;
  else
    sed -i -e "s|${placeholder}|\\\`$ENV\\\`|g" $dir/${dotenvJsFileName}-legacy.js;
  fi
fi
`;
