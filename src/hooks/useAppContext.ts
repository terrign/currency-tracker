import { useContext } from 'react';

import { AppContext } from '../context/App/App.context';

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  return ctx;
};
