set -e

# set up
rm -rf dist

# act
pnpm run build
pnpm exec cross-env HELLO=import-meta-env import-meta-env -o dist/custom-assets-dir/import-meta-env*

# assert
diff -r dist __dist__
