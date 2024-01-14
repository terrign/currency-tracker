import { Theme } from '../models';

export const matchesDarkThemeMedia = () =>
  window?.matchMedia && window?.matchMedia('(prefers-color-scheme: dark)').matches;

export const getInitialThemeFromLocal = (): Theme => {
  const theme = localStorage?.getItem('theme') as Theme;
  if (theme) {
    return theme;
  }

  if (matchesDarkThemeMedia()) {
    return 'dark';
  }

  return 'light';
};
