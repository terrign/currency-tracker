import '@testing-library/jest-dom';

import { render, waitFor } from '@testing-library/react';

import { App } from './App';

describe('test', () => {
  it('Renders app', async () => {
    const { container } = render(<App />);
    await waitFor(() => expect(container).toBeInTheDocument());
  });
});
