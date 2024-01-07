import { createContext } from 'react';

import { AppContextType } from './models';

const AppContext = createContext<AppContextType>({
  preferredCurrency: 'USD',
  dispatch: null,
});

export default AppContext;
