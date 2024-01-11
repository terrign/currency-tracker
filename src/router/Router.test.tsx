import '@testing-library/jest-dom';

import { render, waitFor } from '@testing-library/react';

import Router from '.';

describe('Router', () => {
  it('Renders', async () => {
    const { container } = render(<Router />);
    await waitFor(() => expect(container).toBeInTheDocument());
  });
});
