set -e

# set up
rm -rf custom-out-dir

# act
pnpm exec vite build
pnpm exec cross-env HELLO=import-meta-env import-meta-env --example .env.example -o "custom-out-dir/**/*"

# assert
diff -r custom-out-dir __fixtures__
