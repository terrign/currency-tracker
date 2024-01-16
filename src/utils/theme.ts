import { LocalStorageKeys, Theme } from 'types';

export const matchesDarkThemeMedia = () =>
  window?.matchMedia && window?.matchMedia('(prefers-color-scheme: dark)').matches;

export const setDomTheme = (theme: Theme) => {
  document.body.className = `theme-${theme}`;
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem('theme', theme);
};

export const getInitialThemeFromLocal = (): Theme => {
  const theme = localStorage?.getItem(LocalStorageKeys.THEME) as Theme;
  if (theme) {
    setDomTheme(theme);
    return theme;
  }

  if (matchesDarkThemeMedia()) {
    setDomTheme(Theme.DARK);
    return Theme.DARK;
  }

  setDomTheme(Theme.LIGHT);
  return Theme.LIGHT;
};
