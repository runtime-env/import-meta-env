set -e

# set up
rm -rf .next

# act
pnpm exec next build
pnpm exec cross-env HELLO=import-meta-env import-meta-env --example .env.example

# assert
diff -r .next/static/chunks/pages/index*.js __fixtures__/index*.js
