set -e

pnpm exec cross-env HELLO=import-meta-env mocha
