set -e

# set up
rm -rf dist

# act
yarn vue-cli-service build
yarn cross-env HELLO=import-meta-env node node_modules/.bin/import-meta-env

# assert
diff -r dist __fixtures__
