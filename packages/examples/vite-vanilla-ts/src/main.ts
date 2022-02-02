import "./style.css";
// @ts-ignore
import env from "env";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Hello ${env.VITE_NAME}!</h1>
`;
