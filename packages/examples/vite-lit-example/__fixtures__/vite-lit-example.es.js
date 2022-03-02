import { e } from "./import-meta-env.js";
import { LitElement, html } from "lit";
class MyElement extends LitElement {
  render() {
    return html` <h1>Hello: ${e.HELLO}</h1> `;
  }
}
window.customElements.define("my-element", MyElement);
export { MyElement };
