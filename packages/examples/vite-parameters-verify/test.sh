set -e
rm -rf dist
pnpm run build
cp .env.prod ./dist/assets/.env
./dist/assets/.env.sh
diff dist __dist__ -r
