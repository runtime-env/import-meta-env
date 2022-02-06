set -e

# set up
rm -rf dist
mv .env .env.tmp

# act
pnpm run build
cp .env.tmp ./dist/custom-assets-dir/.env
sh inject-env.sh

# assert
diff -r dist __dist__

# tear down
mv .env.tmp .env
