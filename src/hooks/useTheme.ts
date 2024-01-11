import { useContext } from 'react';

import ThemeContext from '../context/Theme/Theme.context';

const useTheme = () => {
  const ctx = useContext(ThemeContext);
  return ctx;
};

export default useTheme;
