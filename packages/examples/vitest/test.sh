set -e

# set up
rm -rf dist

# act
pnpm run build
pnpm exec vite-plugin-dotenv

# assert
diff -r dist __dist__
pnpm exec vitest run
