import "./style.css";
import { getRuntimeConfig } from "@runtime-config/core";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Hello ${getRuntimeConfig("NAME")}!</h1>
`;
