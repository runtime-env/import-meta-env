set -e

# set up
rm -rf dist
mv .env .env.tmp
mv .env.production .env.production.example

# act
pnpm run build
echo 'VITE_EFFECTIVE_MODE_FILE_NAME=.env.production' >> ./dist/assets/.env
echo 'VITE_CUSTOM_ENV_VARIABLE=1' >> ./dist/assets/.env
echo 'CUSTOM_PREFIX_ENV_VARIABLE=1' >> ./dist/assets/.env
sh inject-env.sh

# assert
diff -r dist __dist__

# tear down
mv .env.tmp .env
mv .env.production.example .env.production
