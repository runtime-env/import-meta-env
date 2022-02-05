set -e

# set up
rm -rf custom-out-dir
mv .env .env.tmp

# act
pnpm run build
cp .env.tmp ./custom-out-dir/assets/.env
./custom-out-dir/assets/.env.sh

# assert
diff -r custom-out-dir __dist__

# tear down
mv .env.tmp .env
