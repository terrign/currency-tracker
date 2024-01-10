import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import routes from '../router/routes';

describe('TimeLine', () => {
  it('Renders', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/timeline'] });
    act(() => render(<RouterProvider router={router} />));
    expect(screen.getByText('Build currency rate chart')).toBeInTheDocument();
  });
});

describe('BankMap', () => {
  it('Renders', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/bankmap'] });
    act(() => render(<RouterProvider router={router} />));
    expect(screen.getByText('Search currency in the bank')).toBeInTheDocument();
  });
});
