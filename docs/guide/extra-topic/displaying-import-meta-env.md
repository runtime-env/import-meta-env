# Displaying import.meta.env

Import-meta-env will also replace all `import.meta.env` appearing in JavaScript strings, so you may see some weird errors like:

```js
console.log("import.meta.env.API_BASE_URL is:");
console.log(import.meta.env.API_BASE_URL);
```

will be transformed into:

```js
console.log(
  ""__import_meta_env_placeholder__".API_BASE_URL is:"
// ^ SyntaxError: missing ) after argument list)
);
console.log("__import_meta_env_placeholder__".API_BASE_URL);
```

To avoid this, you can break the string up with a unicode zero-width space, e.g.:

```js
console.log("import.meta\u200b.env.API_BASE_URL is:");
console.log(import.meta.env.API_BASE_URL);
```

output:

```js
console.log("import.meta\u200b.env.API_BASE_URL is:");
console.log("__import_meta_env_placeholder__".API_BASE_URL);
```
