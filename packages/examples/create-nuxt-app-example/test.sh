set -e

# set up
rm -rf dist
rm -rf node_modules/.cache

# act
yarn nuxt generate
yarn cross-env HELLO=import-meta-env node node_modules/.bin/import-meta-env --example .env.example.public

# assert
diff -r dist/_nuxt/pages/index.js __fixtures__
