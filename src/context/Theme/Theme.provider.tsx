import { Theme } from 'models';
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';
import { getInitialThemeFromLocal } from 'utils';

import { ThemeContext } from './Theme.context';

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(() => getInitialThemeFromLocal());
  const bodyRef = useRef(document.body);
  const documentRef = useRef(document.documentElement);

  const setAppTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    bodyRef.current.className = `theme-${newTheme}`;
    documentRef.current.style.colorScheme = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setAppTheme('dark');
      return;
    }
    setAppTheme('light');
  };

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme],
  );

  useEffect(() => {
    if (theme === 'dark') {
      setAppTheme('dark');
      return;
    }
    setAppTheme('light');
  }, [theme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}
