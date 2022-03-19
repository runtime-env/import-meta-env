# Examples

## Setup

```bash
git clone https://github.com/iendeavor/import-meta-env
cd import-meta-env
pnpm run install
# Before running the examples, you must build the import-meta-env package:
pnpm run build
```

## Running Examples

```bash
cd <example_directory>
pnpm run install
```

Each example may have the following scripts:

```bash
# run in dev server mode
pnpm run dev

# build production code
pnpm run build

# populate environment variables into production code
pnpm run populate

# preview production code
pnpm run preview

# run tests
pnpm run test
```

> For the `yarn` examples (the examples directory will contain a yarn.lock file), you need to replace `pnpm` with `yarn`.
