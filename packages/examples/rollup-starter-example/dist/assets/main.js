import { e } from './import-meta-env.js';

document.querySelector("#app").innerHTML = "\n  <h1>Hello: ".concat(e.HELLO, "</h1>\n");
