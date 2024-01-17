import { Route } from 'types';

describe('Timeline', () => {
  it('Works', () => {
    cy.visit(Route.BANKMAP);
    cy.get('input[placeholder="Search currency"]').type('AUD');
    cy.get('li button').click();
  });
});
