import { useTheme } from 'hooks/useTheme';
import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { Theme } from 'types';
import { setDomTheme } from 'utils';

import { ThemeContext } from './Theme.context';

export function ThemeProvider({ children }: PropsWithChildren) {
  const defaultTheme = useTheme().theme;
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const setAppTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    setDomTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    if (theme === Theme.LIGHT) {
      setAppTheme(Theme.DARK);
      return;
    }
    setAppTheme(Theme.LIGHT);
  }, [theme, setAppTheme]);

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}
