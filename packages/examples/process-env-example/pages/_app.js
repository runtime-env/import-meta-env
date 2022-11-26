import Script from "next/script";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: `globalThis.import_meta_env=JSON.parse('"import_meta_env_placeholder"')`,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
