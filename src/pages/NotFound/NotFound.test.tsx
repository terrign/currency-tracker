import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Root } from '../Root';
import { NotFound } from '.';

describe('NotFound', () => {
  it('renders 404 error message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const errorMessage = screen.getByText(/Seems like the page you are looking for does not exist/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders back home button', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const backButton = screen.getByRole('link', { name: /Back Home/i });
    expect(backButton).toBeInTheDocument();
  });

  it('back home button links to home page', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const backButton = screen.getByRole('link', { name: /Back Home/i });
    expect(backButton).toHaveAttribute('href', '/');
  });
  it('Redirects to NotFound for invalid path', async () => {
    render(
      <MemoryRouter initialEntries={['/wrong']}>
        <Root />
      </MemoryRouter>,
    );

    const notFoundText = screen.findByText(/Seems like the page you are looking for does not exist/i);
    expect(notFoundText).not.toBeNull();
  });
});
