import { Route } from 'types';

describe('Timeline', () => {
  it('Works', () => {
    cy.visit(Route.TIMELINE);
    cy.get('#baseCurrency').type('AUD');
    cy.get('li button').click();
    cy.get('#compareCurrency').type('USD');
    cy.get('li button').click();
    cy.get('#startDate').type('2022-01-01');
    cy.get('h5').should('have.text', 'Chart');
    cy.get('form button[type="submit"]').click();
    cy.get('h5 ~ p').should('have.text', 'Random data generated');
    cy.get('form ~ button').click();
    cy.get('section[role="alertdialog"] button[type="submit"]').as('submitButton').click();
    cy.get('@submitButton').should('not.exist');
  });
});
