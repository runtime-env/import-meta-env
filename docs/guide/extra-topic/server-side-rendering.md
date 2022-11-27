# Server Side Rendering

Since environment variables are statically injected into the client-side's `globalThis.import_meta_env` , you'll need to use the client-side's hook (or similar technique) to obtain these environment variables.

For example, in [NEXT.js](https://nextjs.org/) you can use [the `useEffect` hook to access `globalThis.import_meta_env`](https://nextjs.org/docs/migrating/from-create-react-app#safely-accessing-web-apis):

```tsx
import { useEffect, useMemo, useState } from "react";

const useImportMetaEnv = () => {
  const [env, setEnv] = useState({ HELLO: "" });

  useEffect(() => {
    setEnv({ HELLO: import.meta.env.HELLO });
  }, []);

  return useMemo(() => env, [env]);
};

export default function Home() {
  const env = useImportMetaEnv();

  return <h1>Hello: {env.HELLO}</h1>;
}
```
