# Can I have multiple `.env` files

Yes. You can choose which one to be used by passing the `env` option to `import-meta-env`, for example, you can pass `.env.local` to `import-meta-env`:

```bash
./node_modules/.bin/import-meta-env \
  --env .env.local \
  --example .env.example
```
