import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { CurrencySymbol } from '.';

test('Renders correct symbol', async () => {
  render(<CurrencySymbol iso="USD" />);
  expect(screen.getByText(/\$/)).toBeInTheDocument();
});
