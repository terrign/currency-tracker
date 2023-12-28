import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';

import ThemeContext, { Theme } from './Theme.context';

function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(() => 'unset');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme],
  );

  const setDarkTheme = useCallback(() => {
    setTheme('dark');
    document.body.className = 'theme-dark';
    document.documentElement.style.colorScheme = 'dark';
  }, []);

  const setLightTheme = useCallback(() => {
    setTheme('light');
    document.body.className = 'theme-light';
    document.documentElement.style.colorScheme = 'light';
  }, []);

  const setDefaultThemeBasedOnPrefered = useCallback(() => {
    if (window?.matchMedia && window?.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }, [setDarkTheme, setLightTheme]);

  useEffect(() => {
    setDefaultThemeBasedOnPrefered();
  }, [setDefaultThemeBasedOnPrefered]);

  useEffect(() => {
    if (theme === 'light') {
      setLightTheme();
    } else if (theme === 'dark') {
      setDarkTheme();
    }
  }, [theme, setLightTheme, setDarkTheme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
