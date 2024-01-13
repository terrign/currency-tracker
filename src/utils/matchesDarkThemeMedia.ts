export const matchesDarkThemeMedia = () =>
  window?.matchMedia && window?.matchMedia('(prefers-color-scheme: dark)').matches;
