# Sensitive Environment Variables

You may want to define all necessary environment variables in .env.example (i.e. including credentials), in this case, you can creating two example files, and pass the `.env.example.public` file to `import-meta-env` options:

```ini
# .env.example
S3_BUCKET=
SECRET_KEY=
```

```ini
# .env.example.public
S3_BUCKET=
```

Or you may write a script to automatically create the `.env.example.public` file by filtering out the sensitive environment variables, it's all up to you:

```ini
# .env.example
PUBLIC_S3_BUCKET=
SECRET_KEY=
```

```ini
# .env.example.public
PUBLIC_S3_BUCKET=
```

In addition, you should use `process.env` to access the sensitive environment variables in your code instead of accessing the environment variables by `import.meta.env`, this could help you to identify the sensitive environment variables in your code:

```js
const S3_BUCKET = import.meta.env.S3_BUCKET;
const SECRET_KEY = process.env.SECRET_KEY;
```

To populate sensitive environment variables, you should still use [webpack.EnvironmentPlugin](https://webpack.js.org/plugins/environment-plugin/) or similar:

```js
new webpack.EnvironmentPlugin(["SECRET_KEY"]);
```

```js
console.log(process.env.SECRET_KEY); // "YOUR_SECRET_KEY_GOES_HERE"
```

If you need to populate the sensitive environment variables at run-time, you need to find out another way to do it, for example:

1. For [NEXT.js](https://nextjs.org/), you can use [serverRuntimeConfig](https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration).
2. For [NuxtJS](https://nuxtjs.org/), you can use [privateRuntimeConfig](https://nuxtjs.org/docs/configuration-glossary/configuration-runtime-config).
