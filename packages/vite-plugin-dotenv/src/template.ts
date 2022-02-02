export const createDotenvShellTemplate = ({
  dotenvJsFileName,
  placeholder,
}: {
  dotenvJsFileName: string;
  placeholder: string;
}) => `
#!/bin/sh

dir=$(dirname $0)

# read .env
ENV=""
while read line; do
  ENV+=$line
  ENV+="\\n"
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
sed -i '' "s/${placeholder}/\\\`$ENV\\\`/g" $dir/${dotenvJsFileName}.js;

if [ -e $dir/${dotenvJsFileName}-legacy.js ]
then
  if [ -e $dir/${dotenvJsFileName}-legacy.js~ ]
  then
    cp $dir/${dotenvJsFileName}-legacy.js~ $dir/${dotenvJsFileName}-legacy.js
  else
    cp $dir/${dotenvJsFileName}-legacy.js $dir/${dotenvJsFileName}-legacy.js~
  fi
  sed -i '' "s/${placeholder}/\\\`$ENV\\\`/g" $dir/${dotenvJsFileName}-legacy.js;
fi
`;
