set -e

# set up
rm -rf dist

# act
pnpm run build
pnpm exec import-meta-env

# assert
diff -r dist __dist__
