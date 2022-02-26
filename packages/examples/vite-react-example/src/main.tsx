import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <React.StrictMode>
    <h1>Hello: {import.meta.env.HELLO}</h1>
  </React.StrictMode>,
  document.getElementById("root")
);
