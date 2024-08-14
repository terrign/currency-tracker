import '@testing-library/jest-dom';

import { render, renderHook, screen } from '@testing-library/react';
import { useAppContext } from 'hooks/useAppContext';
import { act } from 'react-dom/test-utils';

import { AppContext } from './App.context';
import { AppProvider } from './App.provider';

describe('App context', () => {
  it('Provides default value', async () => {
    act(() =>
      render(
        <AppProvider>
          <AppContext.Consumer>{(ctx) => <p>{ctx.preferredCurrency}</p>}</AppContext.Consumer>
        </AppProvider>,
      ),
    );
    const elem = await screen.findByText(/^USD/);
    expect(elem).toHaveTextContent('USD');
  });
});

describe('React hook', () => {
  it('Renders', () => {
    const { result } = renderHook(useAppContext);
    expect(result).toBeTruthy();
  });
});
