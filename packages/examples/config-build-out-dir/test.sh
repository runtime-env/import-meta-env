set -e

# set up
rm -rf custom-out-dir

# act
pnpm run build
pnpm exec vite-plugin-dotenv -o custom-out-dir/assets/vite-plugin-dotenv*

# assert
diff -r custom-out-dir __dist__
