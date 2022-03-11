set -e

# set up
rm -rf .svelte

# act
pnpm exec svelte-kit build
pnpm exec cross-env HELLO=import-meta-env import-meta-env --example .env.example --output ".svelte-kit/output/**"
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/\"VITE_SVELTEKIT_APP_VERSION\"\: \".............\", //g" .svelte-kit/output/server/chunks/import-meta-env-*.js
else
  sed -i -e "s|\"VITE_SVELTEKIT_APP_VERSION\"\: \".............\", ||g" .svelte-kit/output/server/chunks/import-meta-env-*.js
fi

# assert
diff -r .svelte-kit/output/server/chunks/import-meta-env-*.js __fixtures__/import-meta-env-*.js
