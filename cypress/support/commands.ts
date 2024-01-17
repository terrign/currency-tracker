/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    interceptRequest(): Chainable;
  }
}

Cypress.Commands.add('interceptRequest', () => {
  cy.intercept('GET', `${process.env.CURRENCY_API_URL}/latest/*`, { fixture: 'resMock' }).as('currencyRates');
  cy.visit('/');
  cy.wait('@currencyRates');
});
