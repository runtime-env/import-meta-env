set -e

# set up
rm -rf .next

# act
pnpm run build
pnpm exec cross-env HELLO=import-meta-env import-meta-env -o .next/static/chunks/pages/*

# assert
diff -r .next/static/chunks/pages/index*.js __fixtures__/index*.js
