set -e

# set up
rm -rf dist

# act
pnpm exec rollup -c
pnpm exec cross-env HELLO=import-meta-env import-meta-env

# assert
diff -r dist __fixtures__
