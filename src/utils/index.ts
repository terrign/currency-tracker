import { capitalizeFirstLetter } from './capitalizeFirstLetter';
import { today, toStringDate } from './date';
import { filterBanksByCurrency } from './filterBanksByCurrency';
import { generateRandomCurrencyHistoryData } from './generateRandomCurrencyHistoryData';
import { getPreferredCurrencyFromLocal } from './getPreferredCurrencyFromLocal';
import { includes } from './includes';
import { getInitialThemeFromLocal, matchesDarkThemeMedia, setDomTheme } from './theme';

export {
  capitalizeFirstLetter,
  filterBanksByCurrency,
  generateRandomCurrencyHistoryData,
  getInitialThemeFromLocal,
  getPreferredCurrencyFromLocal,
  includes,
  matchesDarkThemeMedia,
  setDomTheme,
  today,
  toStringDate,
};
