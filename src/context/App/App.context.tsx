import { createContext } from 'react';

import { AppContextType } from './models';

export const AppContext = createContext<AppContextType>({
  preferredCurrency: 'USD',
  dispatch: () => null,
});
