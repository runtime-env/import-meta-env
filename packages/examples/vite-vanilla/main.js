import { greeting } from "./greeting";
import "./style.css";

document.querySelector("#app").innerHTML = `
  <h1>${greeting}</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;
console.log(import.meta.env);
