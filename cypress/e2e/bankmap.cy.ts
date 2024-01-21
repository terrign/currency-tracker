import { Route } from 'types';
import { filterBanksByCurrency } from '../../src/utils/filterBanksByCurrency';

describe('Bank map', () => {
  it('Renders correct markers amount', () => {
    cy.visit(Route.BANKMAP);
    cy.get('input[placeholder="Search currency"]').type('AUD');
    cy.get('li button').click();
    cy.get('div[aria-label="Map marker"]').children().should('have.length', filterBanksByCurrency('AUD').length);
  });
});
