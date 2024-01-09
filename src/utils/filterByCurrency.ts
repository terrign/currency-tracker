import { BANK_MAP_INFO } from '../constants/bankMapInfo';
import { CurISO } from '../constants/currencyISOSymbolMap';

export const filterByCurrency = (currency: CurISO) =>
  [...BANK_MAP_INFO].filter((bank) => bank.rates.includes(currency));
