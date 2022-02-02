import "./style.css";
import { greeting } from "./greeting";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>${greeting}</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;
