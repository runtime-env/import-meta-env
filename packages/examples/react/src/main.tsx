import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <React.StrictMode>
    <h1>VITE_NAME: {import.meta.env.VITE_NAME}</h1>
  </React.StrictMode>,
  document.getElementById("root")
);
