import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useMemo, useReducer } from 'react';
import { act } from 'react-dom/test-utils';

import { resMock } from '../../../__test__/__mocks__/resMock';
import { CUR_ISO_SYMBOL_MAP } from '../../constants/currencyISOSymbolMap';
import AppContext from '../../context/App/App.context';
import appReducer from '../../context/App/App.reducer';
import { AppReducerType } from '../../context/App/models';
import CurrencyModalContent from '.';

function TestComponent() {
  const [{ preferredCurrency }, dispatch] = useReducer<AppReducerType>(appReducer, {
    preferredCurrency: 'USD',
  });

  const contextValue = useMemo(
    () => ({
      preferredCurrency,
      dispatch,
    }),
    [preferredCurrency],
  );

  return (
    <AppContext.Provider value={contextValue}>
      <CurrencyModalContent iso="EUR" />
    </AppContext.Provider>
  );
}

describe('CurrencyModalContent', () => {
  it('Renders content', () => {
    act(() => {
      render(<TestComponent />);
    });

    expect(screen.getByText(CUR_ISO_SYMBOL_MAP.EUR.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(CUR_ISO_SYMBOL_MAP.USD.name)).toBeInTheDocument();
  });

  it('Can select different currency to compare, displays correct value after change', async () => {
    await waitFor(() => {
      act(() => render(<TestComponent />));
    });

    const input = await screen.findByDisplayValue(CUR_ISO_SYMBOL_MAP.USD.name);

    await waitFor(() => {
      act(() => {
        fireEvent.change(input, { target: { value: 'pound' } });
      });
    });

    const button = await screen.findByRole('button', { name: /Pound Sterling/ });

    await waitFor(() => {
      act(() => {
        fireEvent.click(button);
      });
    });

    expect(screen.getByDisplayValue(CUR_ISO_SYMBOL_MAP.GBP.name)).toBeInTheDocument();

    await new Promise((resolve) => {
      setTimeout(() => resolve(null), 100);
    });
    expect(screen.getByText(/Rate: /)).toHaveTextContent(
      `Rate: ${resMock.data.GBP.value}${CUR_ISO_SYMBOL_MAP.GBP.symbol}`,
    );
  });
});
