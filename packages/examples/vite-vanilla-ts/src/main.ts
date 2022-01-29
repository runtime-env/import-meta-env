import "./style.css";
import env from "./env.json";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Hello ${env.NAME}!</h1>
`;
