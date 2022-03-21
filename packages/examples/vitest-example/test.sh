set -e

pnpm exec cross-env HELLO=import-meta-env vitest run
