import { greeting } from "./greeting";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>${greeting}</h1>
`;
