set -e

# set up
rm -rf dist

# act
pnpm run build
./dist/assets/.env.sh

# assert
diff -r dist __dist__
