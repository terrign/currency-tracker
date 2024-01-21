/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    interceptRequest(): Chainable;
    fillTimeLineForm(): Chainable;
    fillUpdateTimeLineForm(ohlc: string[]): Chainable;
    updateTimeLineErrorsVisible(): Chainable;
  }
}

Cypress.Commands.add('interceptRequest', () => {
  cy.intercept('GET', `${process.env.CURRENCY_API_URL}/latest/*`, { fixture: 'resMock' }).as('currencyRates');
  cy.visit('/');
  cy.wait('@currencyRates');
});

Cypress.Commands.add('fillTimeLineForm', () => {
  cy.get('#baseCurrency').type('AUD');
  cy.get('li button').click();
  cy.get('#compareCurrency').type('USD');
  cy.get('li button').click();
  cy.get('#startDate').type('2022-01-01');
});

Cypress.Commands.add('fillUpdateTimeLineForm', ([o, h, l, c]: string[]) => {
  cy.get('input#open').as('open').invoke('val', '').type(o);
  cy.get('input#high').as('high').invoke('val', '').type(h);
  cy.get('input#low').as('low').invoke('val', '').type(l);
  cy.get('input#close').as('close').invoke('val', '').type(c);
});

Cypress.Commands.add('updateTimeLineErrorsVisible', () => {
  cy.get('p[data-testid="openError"]').should('be.visible');
  cy.get('p[data-testid="highError"]').should('be.visible');
  cy.get('p[data-testid="lowError"]').should('be.visible');
  cy.get('p[data-testid="closeError"]').should('be.visible');
});
