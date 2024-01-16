describe('Home page', () => {
  it('Opens', () => {
    cy.visit('/');
  });

  it('Has header', () => {
    cy.visit('/');
    cy.get('header').should('exist');
  });

  it('Has Navigation', () => {
    cy.visit('/');
    cy.get('header nav').should('exist');
  });
});
