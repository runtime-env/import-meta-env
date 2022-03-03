set -e

# set up
rm -rf dist
rm -rf node_modules/.cache

# act
yarn nuxt build
yarn cross-env HELLO=import-meta-env node node_modules/.bin/import-meta-env -o .output/public/_nuxt/pages/* .output/server/chunks/app/pages/*

# assert
diff -r .output/public/_nuxt/pages/ __fixtures__/public/_nuxt/pages/
