set -e

# set up
rm -rf custom-out-dir

# act
pnpm run build
sh inject-env.sh

# assert
diff -r custom-out-dir __dist__
