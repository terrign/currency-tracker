import { DEFAULT_CURRENCY } from '@constants';
import { CurISO, LocalStorageKeys } from 'types';

export const getPreferredCurrencyFromLocal = (): CurISO => {
  const currency = localStorage?.getItem(LocalStorageKeys.PREFERRED_CURRENCY) as CurISO;
  if (currency) {
    return currency;
  }
  localStorage.setItem(LocalStorageKeys.PREFERRED_CURRENCY, 'USD');
  return DEFAULT_CURRENCY;
};
