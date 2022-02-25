import { hello } from "./hello";

document.querySelector("#app").innerHTML = `
  <h1>Hello: ${hello}</h1>
`;
