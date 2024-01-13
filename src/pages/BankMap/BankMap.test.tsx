import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import BankMap from '.';

describe('BankMap', () => {
  it('Renders', async () => {
    act(() => {
      render(
        <MemoryRouter>
          <BankMap />
        </MemoryRouter>,
      );
    });
    const elem = await screen.findByText(/Search currency in the bank/);
    expect(elem).toBeInTheDocument();
  });
});
