import React, { Suspense } from "react";
const RemoteApp = React.lazy(() => import("app2/App"));

const App = () => {
  return (
    <>
      <h1>Hello: {import.meta.env.HELLO}</h1>
      <Suspense fallback={"loading..."}>
        <RemoteApp />
      </Suspense>
    </>
  );
};

export default App;
