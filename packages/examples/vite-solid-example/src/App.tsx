import type { Component } from "solid-js";

const App: Component = () => {
  const hello = import.meta.env.HELLO;
  return <h1>Hello: {hello}</h1>;
};

export default App;
