set -e
rm -rf dist
mv .env .env.example
pnpm run build
cp .env.example ./dist/custom-assets-dir/.env
./dist/custom-assets-dir/.env.sh
diff dist __dist__ -r
mv .env.example .env
