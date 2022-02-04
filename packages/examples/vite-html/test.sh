set -e

# set up
rm -rf dist
mv .env .env.example
mv .env.production .env.production.example

# act
pnpm run build
echo 'VITE_EFFECTIVE_MODE_FILE_NAME=.env.production' >> ./dist/assets/.env
echo 'VITE_CUSTOM_ENV_VARIABLE=1' >> ./dist/assets/.env
echo 'CUSTOM_PREFIX_ENV_VARIABLE=1' >> ./dist/assets/.env
./dist/assets/.env.sh

# assert
diff dist __dist__ -r

# tear down
mv .env.example .env
mv .env.production.example .env.production
