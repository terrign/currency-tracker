import '@testing-library/jest-dom';

import { CURRENCY_ISO_SYMBOL_MAP } from '@constants';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { currencyRatesResMock } from 'mocks/currencyRatesResMock';
import { act } from 'react-dom/test-utils';

import { CurrencyModalContent } from '.';

describe('CurrencyModalContent', () => {
  it('Renders content', async () => {
    act(() => {
      render(<CurrencyModalContent iso="USD" />);
    });

    const text = await screen.findByText(/US Dollar/);

    expect(text).toBeInTheDocument();
  });

  it('Can select different currency to compare, displays correct value after change', async () => {
    waitFor(() => {
      act(() => {
        render(<CurrencyModalContent iso="USD" />);
      });
    });

    const input = await screen.findByDisplayValue(CURRENCY_ISO_SYMBOL_MAP.USD.name);

    waitFor(() => {
      act(() => {
        fireEvent.change(input, { target: { value: 'pound' } });
      });
    });

    const button = await screen.findByRole('button', { name: /Pound Sterling/ });

    waitFor(() => {
      act(() => {
        fireEvent.click(button);
      });
    });

    expect(screen.getByDisplayValue(CURRENCY_ISO_SYMBOL_MAP.GBP.name)).toBeInTheDocument();

    const result = await screen.findByText(/Rate: /);

    expect(result).toHaveTextContent(
      `Rate: ${currencyRatesResMock.data.GBP.value}${CURRENCY_ISO_SYMBOL_MAP.GBP.symbol}`,
    );
  });
});
