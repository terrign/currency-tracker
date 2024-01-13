import localforage from 'localforage';
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';

import { matchesDarkThemeMedia } from '../../utils/matchesDarkThemeMedia';
import ThemeContext, { Theme } from './Theme.context';

function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>('dark');
  const bodyRef = useRef(document.body);
  const documentRef = useRef(document.documentElement);

  const setAppTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    bodyRef.current.className = `theme-${newTheme}`;
    documentRef.current.style.colorScheme = newTheme;
    localforage.setItem('theme', newTheme);
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

  const setDefaultThemeBasedOnPrefered = async () => {
    const preferredTheme = await localforage.getItem('theme');

    if (preferredTheme) {
      setAppTheme(preferredTheme as Theme);
      return;
    }

    if (matchesDarkThemeMedia()) {
      setAppTheme('dark');
      return;
    }

    setAppTheme('light');
  };

  useEffect(() => {
    setDefaultThemeBasedOnPrefered();
  }, []);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
