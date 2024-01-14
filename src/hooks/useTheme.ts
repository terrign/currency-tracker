import { useContext } from 'react';

import { ThemeContext } from '../context/Theme/Theme.context';

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  return ctx;
};
