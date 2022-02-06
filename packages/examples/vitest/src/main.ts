import { name } from "./name";

document.querySelector("#app")!.innerHTML = `
  <h1>VITE_NAME: ${name}</h1>
`;
