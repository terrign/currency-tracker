import { useContext } from 'react';

import AppContext from '../context/App/App.context';

const useAppContext = () => {
  const ctx = useContext(AppContext);
  return ctx;
};

export default useAppContext;
