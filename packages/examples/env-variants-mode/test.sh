set -e

# set up
rm -rf dist
mv .env .env.tmp
mv .env.production .env.production.tmp

# act
pnpm run build
echo "$(cat .env.production.tmp)\n$(cat .env.tmp)" > ./dist/assets/.env
sh inject-env.sh

# assert
diff -r dist __dist__

# tear down
mv .env.tmp .env
mv .env.production.tmp .env.production
