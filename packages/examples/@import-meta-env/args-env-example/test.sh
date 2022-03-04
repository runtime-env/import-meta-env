set -e

# set up
rm -rf dist

# act
pnpm exec vite build
pnpm exec import-meta-env --env .custom-env-path --example .env.example

# assert
diff -r dist __fixtures__
pnpm exec jest --no-cache
