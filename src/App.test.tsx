import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import routes from './router/routes';

describe('test', () => {
  it('Renders app', async () => {
    const router = createMemoryRouter(routes);
    render(<RouterProvider router={router} />);
    await waitFor(() => expect(screen.getByText(`Bank Map`)).toBeInTheDocument());
  });
});
