set -e

# set up
rm -rf build

# act
node scripts/build.js
pnpm exec cross-env HELLO=import-meta-env import-meta-env -o build/static/js/*

# assert
diff -r build/static/js/main*.js __fixtures__
pnpm exec cross-env HELLO=import-meta-env jest .
