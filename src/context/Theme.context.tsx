import { createContext, Dispatch, SetStateAction } from 'react';

export type Theme = 'light' | 'dark' | 'unset';

interface ThemeContextType {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>> | null;
  toggleTheme?: (() => void) | null;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'light', setTheme: null, toggleTheme: null });

export default ThemeContext;
