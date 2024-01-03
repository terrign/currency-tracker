import { CUR_ISO_SYMBOL_MAP } from '../constants/currencyISOSymbolMap';

type MapKey = keyof typeof CUR_ISO_SYMBOL_MAP;

export const getCurrencySymbol = (iso: string | MapKey) => {
  if (iso in CUR_ISO_SYMBOL_MAP) {
    return CUR_ISO_SYMBOL_MAP[iso as MapKey];
  }
  return iso;
};
