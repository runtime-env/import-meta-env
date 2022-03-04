set -e

# set up
rm -rf dist

# act
pnpm exec vite build
pnpm exec cross-env HELLO=import-meta-env import-meta-env --example .env.example

# assert
diff -r dist __fixtures__
pnpm exec cross-env HELLO=import-meta-env vitest run
