import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const { data, error } = useSWR("/api/process-env", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <p>
        import.meta.{"\0"}env: {JSON.stringify(import.meta.env)}
      </p>
      <p>process.env: {JSON.stringify(data)}</p>
    </>
  );
}
