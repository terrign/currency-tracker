import { CurrencyRates, LocalStorageKeys } from 'types';
import { CURRENCY_ISO_SYMBOL_MAP } from '../../src/constants/currencyISOSymbolMap';

describe('Home', () => {
  beforeEach(() => {
    cy.interceptRequest();
  });

  it('Search works, saves preferred currency to local', () => {
    cy.get('input[type="search"]').invoke('val', '').type('GBP');
    cy.get('li button')
      .click()
      .then(() => {
        const saved = localStorage.getItem(LocalStorageKeys.PREFERRED_CURRENCY);
        expect(saved).equal('GBP');
      });
  });

  it('Modal closes on escape press', () => {
    cy.get('div[data-testid="currency-card-AUD"').click();
    cy.get('section[role="alertdialog"]').as('modal').should('exist');
    cy.get('html').trigger('keydown', { key: 'Escape' });
    cy.get('@modal').should('not.exist');
  });

  it('Modal closes on button click', () => {
    cy.get('div[data-testid="currency-card-AUD"').click();
    cy.get('section[role="alertdialog"]')
      .as('modal')
      .within(() => {
        cy.get('button').click();
      });
    cy.get('@modal').should('not.exist');
  });

  it('Renders rate cards with correct values', () => {
    cy.fixture('resMock').then(({ data }: CurrencyRates) => {
      for (let key in data) {
        if (key === 'USD') {
          continue;
        }
        cy.get(`div[data-testid="currency-card-${data[key].code}"]`).as('card').should('contain', data[key].value);
        cy.get('@card').should('contain', CURRENCY_ISO_SYMBOL_MAP[key].name);
        cy.get('@card').should('contain', CURRENCY_ISO_SYMBOL_MAP[key].symbol);
      }
    });
  });

  it('Modal opens, can select other currency to compare, displays correct value', () => {
    cy.fixture('resMock').then(({ data }: CurrencyRates) => {
      cy.get('div[data-testid="currency-card-AUD"').click();
      cy.get('section[role="alertdialog"]').within(() => {
        cy.get('input[type="search"]').invoke('val', '').type('GBP');
        cy.get('li button').click();
        cy.get('p:last-child').should('contain', `${data.GBP.value}`);
      });
    });
  });
});
