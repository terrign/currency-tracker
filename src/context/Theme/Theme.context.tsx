import { Theme } from 'models';
import { createContext } from 'react';
import { getInitialThemeFromLocal } from 'utils';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme?: (() => void) | null;
}

export const ThemeContext = createContext<ThemeContextType>({ theme: getInitialThemeFromLocal(), toggleTheme: null });
