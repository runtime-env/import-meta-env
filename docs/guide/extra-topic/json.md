# JSON

We sometimes want to store some _structural data_ in an environment variable, in which case we can expose the environment variable in another global variable:

1. Define environment variables:

   ```ini
   # .env.example
   FOO=
   ```

   ```ini
   # .env
   FOO='["BAR","BAZ"]'
   ```

1. Validate, parse, and expose the environment variables:

   ```ts
   // json-env.ts
   // you could use other tools you like:
   import { z } from "zod";
   // you could export instead of expose to global it:
   Object.defineProperty(globalThis, "jsonEnv", {
     configurable: false,
     writable: false,
     value: {
       FOO: z.array(z.string()).parse(import.meta.env.FOO),
     },
   });
   ```

1. (Recommended) Import the `json-env.ts` at the top of your application, then you can ensure that the rest of your application will have a valid JSON env:

   ```ts
   // main.ts
   import "./json-env.ts";
   ```

1. Then you can use it anywhere:

   ```ts
   console.log(jsonEnv.FOO[0]);
   // > "BAR"
   ```
