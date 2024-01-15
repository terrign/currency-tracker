import { CurISO, LocalStorageKeys } from 'models';
import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { getPreferredCurrencyFromLocal } from 'utils';

import { AppContext } from './App.context';

export function AppProvider({ children }: PropsWithChildren) {
  const [preferredCurrency, setPreferredCurrency] = useState(() => getPreferredCurrencyFromLocal());

  const setCurrency = useCallback((iso: CurISO) => {
    setPreferredCurrency(iso);
    localStorage.setItem(LocalStorageKeys.PREFERRED_CURRENCY, iso);
  }, []);

  const contextValue = useMemo(
    () => ({
      preferredCurrency,
      setCurrency,
    }),
    [preferredCurrency],
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}
