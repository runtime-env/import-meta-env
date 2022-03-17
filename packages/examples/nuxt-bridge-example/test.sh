set -e

# set up
rm -rf dist
rm -rf node_modules/.cache

# act
yarn nuxt build
yarn cross-env HELLO=import-meta-env npx import-meta-env --example .env.example.public

# assert
diff -r .output/public/_nuxt/pages/ __fixtures__/public/_nuxt/pages/
