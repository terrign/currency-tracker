import { createContext, Dispatch, SetStateAction } from 'react';

export type Theme = 'light' | 'dark' | null;

export interface ThemeContextType {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>> | null;
  toggleTheme?: (() => void) | null;
}

const ThemeContext = createContext<ThemeContextType>({ theme: null, setTheme: null, toggleTheme: null });

export default ThemeContext;
