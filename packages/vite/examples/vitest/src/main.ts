import { hello } from "./hello";

document.querySelector("#app")!.innerHTML = `
  <h1>HELLO: ${hello}</h1>
`;
