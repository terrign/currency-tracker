import { currencyRatesResMock } from 'resmock';

describe('Root', () => {
  it('Header', () => {
    cy.intercept(
      {
        method: 'GET',
        url: process.env.CURRENCY_API_URL,
      },
      {
        body: currencyRatesResMock,
      },
    );
    cy.visit('/');
    cy.get('header').should('exist');
  });

  it('Navigation', () => {
    cy.visit('/');
  });

  it('Subheader', () => {
    cy.visit('/');
    cy.get('h1 p:nth-child(1)').should('contain.text', 'Modsen Currency');
    cy.get('h1 p:nth-child(2)').should('contain.text', 'Tracker');
    cy.get('div:has(h1) ~ img').should('exist');
    cy.get('h1 ~ p').should('exist');
  });

  it('Footer', () => {
    cy.visit('/');
    cy.get('footer').should('exist');
  });
});
