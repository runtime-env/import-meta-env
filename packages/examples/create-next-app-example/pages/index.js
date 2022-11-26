import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const env = useImportMetaEnv();

  return <h1>Hello: {env.HELLO}</h1>;
}

const useImportMetaEnv = () => {
  const [env, setEnv] = useState({ HELLO: "" });

  useEffect(() => {
    setEnv({ HELLO: import.meta.env.HELLO });
  }, []);

  return useMemo(() => env, [env]);
};
