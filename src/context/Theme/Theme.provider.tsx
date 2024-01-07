import localforage from 'localforage';
import { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import ThemeContext, { Theme } from './Theme.context';

function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(null);

  const bodyRef = useRef(document.body);

  const documentRef = useRef(document.documentElement);

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
    bodyRef.current.className = 'theme-dark';
    documentRef.current.style.colorScheme = 'dark';
    localforage.setItem('theme', 'dark');
  }, []);

  const setLightTheme = useCallback(() => {
    setTheme('light');
    bodyRef.current.className = 'theme-light';
    documentRef.current.style.colorScheme = 'light';
    localforage.setItem('theme', 'light');
  }, []);

  const setDefaultThemeBasedOnPrefered = useCallback(async () => {
    const preferedTheme = await localforage.getItem('theme');

    if (preferedTheme === 'light') {
      setLightTheme();
      return;
    }

    if (preferedTheme === 'dark') {
      setDarkTheme();
      return;
    }

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
