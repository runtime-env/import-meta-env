set -e

# set up
rm -rf dist

# act
yarn build
yarn cross-env HELLO=import-meta-env node node_modules/.bin/import-meta-env -o dist/js/*

# assert
diff -r dist __dist__
