import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';

import App from './App';

describe('test', () => {
  it('Renders app', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText(`App`)).toBeInTheDocument());
  });
});
