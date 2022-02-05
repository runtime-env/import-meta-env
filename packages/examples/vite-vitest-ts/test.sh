set -e

# set up
rm -rf dist
mv .env .env.example

# act
pnpm run build
cp .env.example ./dist/assets/.env
./dist/assets/.env.sh

# assert
diff -r dist __dist__

# tear down
mv .env.example .env

# assert
pnpm exec vitest run
