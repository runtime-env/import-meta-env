set -e

# set up
rm -rf dist

# act
pnpm run build
pnpm exec vite-plugin-dotenv -p __CUSTOM_PLACEHOLDER__

# assert
diff -r dist __dist__
