set -e

# set up
rm -rf dist
mv .env.staging .env.staging.tmp
mv .env.production .env.production.tmp

# act
pnpm run build
cp .env.staging.tmp ./dist/assets/.env
./dist/assets/.env.sh

# assert
diff -r dist __dist__

# tear down
mv .env.staging.tmp .env.staging
mv .env.production.tmp .env.production
