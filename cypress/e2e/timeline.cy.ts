import { Route } from 'types';

describe('Timeline', () => {
  beforeEach(() => {
    cy.visit(Route.TIMELINE);
    cy.fillTimeLineForm();
  });

  it('Creates chart on all data enter', () => {
    cy.get('#chart').should('exist');
  });

  it('Notifies on data creation', () => {
    cy.get('section[data-testid="notification"] h5').should('have.text', 'Chart');
    cy.get('section[data-testid="notification"] p').should('have.text', 'Has been created');
  });

  it('Generates random data and notifies', () => {
    cy.get('form button[type="submit"]').click();
    cy.get('section[data-testid="notification"] h5').should('have.text', 'Chart');
    cy.get('section[data-testid="notification"] p').should('have.text', 'Random data generated');
  });

  it('Closes modal on update', () => {
    cy.get('button:contains("Update")').click();
    cy.get('button:contains("Submit")').click();
    cy.get('input#open').should('not.exist');
  });

  it('Updates data', () => {
    cy.get('button:contains("Update")').click();
    cy.fillUpdateTimeLineForm(['2', '4', '1', '3']);
    cy.get('button:contains("Submit")').click();
    cy.get('section[data-testid="notification"] h5').should('have.text', 'Chart');
    cy.get('section[data-testid="notification"] p').should('have.text', 'Has been updated');
  });

  it('Disables submit button for invalid entries', () => {
    cy.get('button:contains("Update")').click();
    cy.fillUpdateTimeLineForm(['100', '50', '20', '1']);
    cy.get('button:contains("Submit")').should('have.attr', 'disabled');
  });

  it('Shows errors', () => {
    cy.get('button:contains("Update")').click();
    cy.fillUpdateTimeLineForm(['100', '50', '20', '1']);
    cy.updateTimeLineErrorsVisible();
    cy.fillUpdateTimeLineForm(['asd', 'asd', 'asd', 'asd']);
    cy.updateTimeLineErrorsVisible();
    cy.fillUpdateTimeLineForm(['-20', '-1', '-10', '-0.000123']);
    cy.updateTimeLineErrorsVisible();
  });
});
