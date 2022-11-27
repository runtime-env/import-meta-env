# Migration

## Migration from v0.3.\* to v0.4.\*

1. In order to support programmatically injecting script, the placeholder is changed:

   x

   ```html
   <script id="import_meta_env"></script>
   ```

   ✅

   ```js
   globalThis.import_meta_env = JSON.parse('"import_meta_env_placeholder"');
   ```

## Migration from v0.2.\* to v0.3.\*

1. The entire environment variables accessing are dropped, use dedicated environment variables instead:

   x

   ```js
   const env = import.meta.env;
   env.HELLO;
   ```

   ✅

   ```js
   import.meta.env.HELLO;
   ```

1. The computed environment variables are dropped, use static environment variables instead:

   x

   ```js
   import.meta.env["HELLO"];
   ```

   ✅

   ```js
   import.meta.env.HELLO;
   ```

1. In order to inject environment variables at runtime, you need to add a special script tag to your `index.html`:

   ```html
   <script id="import_meta_env"></script>
   ```
