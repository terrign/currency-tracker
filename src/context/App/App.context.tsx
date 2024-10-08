import { createContext } from 'react';
import { CurISO } from 'types';
import { getPreferredCurrencyFromLocal } from 'utils';

export interface AppContextType {
  preferredCurrency: CurISO;
  setCurrency: (iso: CurISO) => void;
}

export const AppContext = createContext<AppContextType>({
  preferredCurrency: getPreferredCurrencyFromLocal(),
  setCurrency: () => {},
});
