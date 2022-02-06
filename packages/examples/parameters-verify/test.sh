set -e

# set up
rm -rf dist
mv .env.production .env.production.tmp

# act
pnpm run build
cp .env.production.tmp ./dist/assets/.env
sh inject-env.sh

# assert
diff -r dist __dist__

# tear down
mv .env.production.tmp .env.production
