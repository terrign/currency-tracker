import { BANK_MAP_INFO } from '@constants';
import { CurISO } from 'types';

export const filterBanksByCurrency = (currency: CurISO) =>
  [...BANK_MAP_INFO].filter((bank) => bank.rates.includes(currency));
