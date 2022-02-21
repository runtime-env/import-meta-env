set -e

# set up
rm -rf dist

# act
echo "=========="
echo "It should throw error when environment variable is NOT defined when run vite dev..."
set +e
if pnpm exec vite; then
  echo command exit $?
  echo "=========="
  exit 1
else
  echo "=========="
fi
set -e

echo "=========="
echo "It should NOT throw error when environment variable is NOT defined when run vite build..."
if pnpm exec vite build; then
  echo "=========="
else
  echo command exit $?
  echo "=========="
  exit 1
fi

echo "=========="
echo "It should throw error when environment variable is NOT defined when run import-meta-env..."
set +e
if pnpm exec import-meta-env; then
  echo command exit $?
  echo "=========="
  exit 1
else
  echo "=========="
fi
set -e

echo "=========="
echo "It should NOT throw error when environment variable is defined when run import-meta-env!"
if pnpm exec cross-env HELLO=from-system import-meta-env; then
  echo "=========="
else
  echo command exit $?
  echo "=========="
  exit 1
fi

# assert
diff -r dist __dist__

echo "Pass!"
