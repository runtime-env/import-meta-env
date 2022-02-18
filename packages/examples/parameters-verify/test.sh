set -e

# set up
rm -rf dist
mv .env .env.bak

# act & assert
set +e
pnpm run dev
set -e

pnpm build
set +e
pnpm exec vite-plugin-dotenv
set -e

# cleanup
mv .env.bak .env
