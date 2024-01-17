describe('Home', () => {
  beforeEach(() => {
    cy.interceptRequest();
  });

  it('Has search', () => {
    cy.get('input[type="search"]').should('exist');
  });

  it('Modal works', () => {
    cy.get('div[data-testid="currency-card-AUD"').should('exist').click();
    cy.get('section[role="alertdialog"] input').should('exist');
    cy.get('section[role="alertdialog"] button').as('closeButton').click();
    cy.get('@closeButton').should('not.exist');
  });
});
