import { createContext } from 'react';

import { Theme } from '../../models';
import { getInitialThemeFromLocal } from '../../utils/theme';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme?: (() => void) | null;
}

export const ThemeContext = createContext<ThemeContextType>({ theme: getInitialThemeFromLocal(), toggleTheme: null });
