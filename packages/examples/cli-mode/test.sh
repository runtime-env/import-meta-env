set -e

# set up
rm -rf dist
mv .env.staging .env.staging.tmp

# act
pnpm run build
cp .env.staging.tmp ./dist/assets/.env
sh inject-env.sh

# assert
diff -r dist __dist__

# tear down
mv .env.staging.tmp .env.staging
