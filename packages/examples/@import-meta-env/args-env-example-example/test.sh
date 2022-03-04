set -e

# set up
rm -rf dist

# act
pnpm exec vite build
pnpm exec cross-env HELLO=import-meta-env import-meta-env --example .custom-env-example-path

# assert
diff -r dist __fixtures__
pnpm exec cross-env HELLO=import-meta-env jest --no-cache
