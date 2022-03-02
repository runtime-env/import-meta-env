set -e

# set up
rm -rf dist
rm -rf node_modules/.cache

# act
yarn generate
yarn cross-env HELLO=import-meta-env node node_modules/.bin/import-meta-env -o dist/_nuxt/pages/*

# assert
diff -r dist/_nuxt/pages/index.js __fixtures__
