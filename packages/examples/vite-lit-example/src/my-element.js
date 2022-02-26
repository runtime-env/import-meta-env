import { html, LitElement } from "lit";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  render() {
    return html` <h1>Hello: ${import.meta.env.HELLO}</h1> `;
  }
}

window.customElements.define("my-element", MyElement);
