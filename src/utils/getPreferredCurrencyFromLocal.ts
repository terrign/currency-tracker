import { DEFAULT_CURRENCY } from '@constants';
import { CurISO, LocalStorageKeys } from 'models';

export const getPreferredCurrencyFromLocal = (): CurISO => {
  const currency = localStorage?.getItem(LocalStorageKeys.PREFERRED_CURRENCY) as CurISO;
  if (currency) {
    return currency;
  }
  return DEFAULT_CURRENCY;
};
