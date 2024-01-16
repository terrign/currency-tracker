import { useAppContext } from 'hooks/useAppContext';
import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { CurISO, LocalStorageKeys } from 'types';

import { AppContext } from './App.context';

export function AppProvider({ children }: PropsWithChildren) {
  const savedpreferredCurrency = useAppContext().preferredCurrency;
  const [preferredCurrency, setPreferredCurrency] = useState(savedpreferredCurrency);

  const setCurrency = useCallback((iso: CurISO) => {
    setPreferredCurrency(iso);
    localStorage.setItem(LocalStorageKeys.PREFERRED_CURRENCY, iso);
  }, []);

  const contextValue = useMemo(
    () => ({
      preferredCurrency,
      setCurrency,
    }),
    [preferredCurrency, setCurrency],
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}
