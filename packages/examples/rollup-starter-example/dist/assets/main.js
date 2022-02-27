import { e } from './import-meta-env.js';

document.querySelector("#app").innerHTML = `
  <h1>Hello: ${e.HELLO}</h1>
`;
