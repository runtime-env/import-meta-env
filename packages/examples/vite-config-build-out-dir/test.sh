set -e

# set up
rm -rf custom-out-dir
mv .env .env.example

# act
pnpm run build
cp .env.example ./custom-out-dir/assets/.env
./custom-out-dir/assets/.env.sh

# assert
diff custom-out-dir __dist__ -r

# tear down
mv .env.example .env
