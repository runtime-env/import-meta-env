import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const all = useSWR("/api/process-env", fetcher);
  const secret1 = useSWR("/api/process-env-secret1", fetcher);
  const secret2 = useSWR("/api/process-env-secret2", fetcher);

  if (all.error) return <div>Failed to load</div>;
  if (secret1.error) return <div>Failed to load</div>;
  if (secret2.error) return <div>Failed to load</div>;

  if (!all.data) return <div>Loading...</div>;
  if (!secret1.data) return <div>Loading...</div>;
  if (!secret2.data) return <div>Loading...</div>;

  return (
    <>
      <div>
        import.meta.{"\0"}env.HELLO: {import.meta.env.HELLO}
      </div>
      <div>
        import.meta.{"\0"}env.SECRET1: {import.meta.env.SECRET1}
      </div>
      <div>
        import.meta.{"\0"}env.SECRET2: {import.meta.env.SECRET2}
      </div>
      <div>process.env: {JSON.stringify(all.data)}</div>
      <div>process.env.SECRET1: {secret1.data}</div>
      <div>process.env.SECRET2: {secret2.data}</div>
    </>
  );
}
