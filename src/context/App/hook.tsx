import { useContext } from 'react';

import AppContext from './App.context';

const useAppContext = () => {
  const ctx = useContext(AppContext);

  if (ctx === undefined) {
    throw new Error('useAppContextHook must be used inside App.provider');
  }
  return ctx;
};

export default useAppContext;
