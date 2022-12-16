describe("e2e", () => {
  it("passes", () => {
    cy.visit(`/`);

    cy.get("span").should("have.text", `Hello ${Cypress.env("HELLO")}`);
  });
});
