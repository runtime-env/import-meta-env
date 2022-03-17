set -e

# set up
rm -rf dist

# act
yarn vue-cli-service build
yarn cross-env HELLO=import-meta-env npx import-meta-env --example .env.example.public

# assert
diff -r dist __fixtures__
