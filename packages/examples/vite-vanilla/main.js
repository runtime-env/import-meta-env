import "./style.css";
import env from "dotenv";

document.querySelector("#app").innerHTML = `
  <h1>Hello ${env.VITE_NAME}!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;
