import { createContext } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme?: (() => void) | null;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', toggleTheme: null });

export default ThemeContext;
