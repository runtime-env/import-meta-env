set -e
rm -rf custom-out-dir
mv .env .env.example
pnpm run build
cp .env.example ./custom-out-dir/assets/.env
./custom-out-dir/assets/.env.sh
diff custom-out-dir __dist__ -r
mv .env.example .env
