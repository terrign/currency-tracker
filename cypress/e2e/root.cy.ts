import { Route } from 'types';

describe('Root', () => {
  beforeEach(() => {
    cy.interceptRequest();
  });

  it('Header', () => {
    cy.get('header').should('exist');
    cy.get('header').should('exist');
  });

  it('Navigation', () => {
    cy.get(`a[href="${Route.CONTACTS}"`).click({ multiple: true });
    cy.location('pathname').should('include', 'contacts');
    cy.get(`a[href="${Route.TIMELINE}"`).click({ multiple: true });
    cy.location('pathname').should('include', 'timeline');
    cy.get(`a[href="${Route.BANKMAP}"`).click({ multiple: true });
    cy.location('pathname').should('include', 'bankmap');
    cy.get(`a[href="${Route.HOME}"`).click({ multiple: true });
    cy.location('pathname').should('include', '');
  });

  it('Theme Toggle', () => {
    cy.get(`button:has(input[type="checkbox"])`).click({ multiple: true });
    cy.get('html').should('have.css', 'color-scheme', 'light');
    cy.get(`button:has(input[type="checkbox"])`).click({ multiple: true });
    cy.get('html').should('have.css', 'color-scheme', 'dark');
  });

  it('Subheader', () => {
    cy.get('h1 p:nth-child(1)').should('contain.text', 'Modsen Currency');
    cy.get('h1 p:nth-child(2)').should('contain.text', 'Tracker');
    cy.get('section:has(h1) ~ img').should('exist');
    cy.get('h1 ~ p').should('exist');
  });

  it('Footer', () => {
    cy.get('footer').should('exist');
  });
});
