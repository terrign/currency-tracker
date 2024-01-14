import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import { Home } from '.';

describe('Home', () => {
  it('Renders', async () => {
    act(() => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>,
      );
    });
    const elem = await screen.findByText(/Quotes for/);
    expect(elem).toBeInTheDocument();
  });
});
