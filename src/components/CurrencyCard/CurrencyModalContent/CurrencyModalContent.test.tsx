import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { resMock } from '../../../../__test__/__mocks__/resMock';
import { CUR_ISO_SYMBOL_MAP } from '../../../constants/currencyISOSymbolMap';
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

    const input = await screen.findByDisplayValue(CUR_ISO_SYMBOL_MAP.USD.name);

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

    expect(screen.getByDisplayValue(CUR_ISO_SYMBOL_MAP.GBP.name)).toBeInTheDocument();

    const result = await screen.findByText(/Rate: /);

    expect(result).toHaveTextContent(`Rate: ${resMock.data.GBP.value}${CUR_ISO_SYMBOL_MAP.GBP.symbol}`);
  });
});
