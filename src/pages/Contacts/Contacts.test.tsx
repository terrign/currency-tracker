import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import Contacts from '.';

describe('Contacts', () => {
  it('Renders', async () => {
    act(() => {
      render(
        <MemoryRouter>
          <Contacts />
        </MemoryRouter>,
      );
    });
    const elem = await screen.findByText(/Contacts/);
    expect(elem).toBeInTheDocument();
  });
});
