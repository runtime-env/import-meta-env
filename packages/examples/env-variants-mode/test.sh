set -e

# set up
rm -rf dist

# act
pnpm run build
sh inject-env.sh

# assert
diff -r dist __dist__
