import { createContext } from 'react';
import { Theme } from 'types';
import { getInitialThemeFromLocal } from 'utils';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: getInitialThemeFromLocal(),
  toggleTheme: () => {},
});
