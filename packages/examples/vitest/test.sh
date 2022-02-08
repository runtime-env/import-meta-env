set -e

# set up
rm -rf dist

# act
pnpm run build
sh inject-env.sh

# assert
diff -r dist __dist__

# assert
pnpm exec vitest run
