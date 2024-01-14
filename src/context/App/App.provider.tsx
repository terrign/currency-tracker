import localforage from 'localforage';
import { CurISO } from 'models';
import { PropsWithChildren, useCallback, useEffect, useMemo, useReducer } from 'react';

import { AppContext } from './App.context';
import { appReducer } from './App.reducer';
import { AppReducerType } from './models';

export function AppProvider({ children }: PropsWithChildren) {
  const [{ preferredCurrency }, dispatch] = useReducer<AppReducerType>(appReducer, {
    preferredCurrency: null,
  });

  const contextValue = useMemo(
    () => ({
      preferredCurrency,
      dispatch,
    }),
    [preferredCurrency],
  );

  const setPreferredCurrencyFromStorage = useCallback(async () => {
    const savedPreferredCurrency = (await localforage.getItem('preferredCurrency')) as CurISO;

    if (savedPreferredCurrency) {
      dispatch({ type: 'preferredCurrency', payload: savedPreferredCurrency });
    } else {
      dispatch({ type: 'preferredCurrency', payload: 'USD' });
      localforage.setItem('preferredCurrency', 'USD');
    }
  }, []);

  useEffect(() => {
    setPreferredCurrencyFromStorage();
  }, [setPreferredCurrencyFromStorage]);

  const setToLocal = useCallback(async () => {
    localforage.setItem('preferredCurrency', preferredCurrency);
  }, [preferredCurrency]);

  useEffect(() => {
    setToLocal();
  }, [preferredCurrency, setToLocal]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}
