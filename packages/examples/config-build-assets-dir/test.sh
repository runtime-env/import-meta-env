set -e

# set up
rm -rf dist

# act
pnpm run build
pnpm exec vite-plugin-dotenv -o dist/custom-assets-dir/vite-plugin-dotenv*

# assert
diff -r dist __dist__
