/// <reference path="../../cypress/support/component.ts" />

import Component from "./Component";

describe("<Component>", () => {
  it("mounts", () => {
    cy.mount(<Component />);

    cy.get("span").should("have.text", `Hello ${Cypress.env("HELLO")}`);
  });
});
