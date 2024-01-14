import '@testing-library/jest-dom';

import { render, renderHook, screen } from '@testing-library/react';
import localforage from 'localforage';
import { act } from 'react-dom/test-utils';

import { useAppContext } from '../../hooks/useAppContext';
import { AppContext } from './App.context';
import { AppProvider } from './App.provider';
import { appReducer } from './App.reducer';

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

  it('Saves currency to local', async () => {
    const value = await localforage.getItem('preferredCurrency');
    expect(value).toBe('USD');
  });
});

describe('App reducer', () => {
  it('Returns new state', () => {
    const state = {
      preferredCurrency: 'USD',
    };

    const newState = appReducer(state, { type: 'preferredCurrency', payload: 'EUR' });

    expect(newState).toEqual({ preferredCurrency: 'EUR' });
  });

  it('Does not mutate original state', () => {
    const state = {
      preferredCurrency: 'USD',
    };
    appReducer(state, { type: 'preferredCurrency', payload: 'EUR' });
    expect(state).not.toEqual({ preferredCurrency: 'EUR' });
  });

  it('Does returns initial state on wrong action', () => {
    const state = {
      preferredCurrency: 'USD',
    };
    // @ts-expect-error wrong types
    const newState = appReducer(state, { type: 'wrong', payload: null });
    expect(state).toEqual(newState);
  });
});

describe('React hook', () => {
  it('Renders', () => {
    const { result } = renderHook(useAppContext);
    // @ts-expect-error wrong types
    expect(result.current.dispatch()).toBe(null);
  });
});
