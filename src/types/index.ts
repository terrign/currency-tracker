import { CURRENCY_ISO_SYMBOL_MAP } from '@constants';

export type NoProps = Readonly<unknown>;

export type Theme = 'light' | 'dark';

export type BankMapInfo = {
  id: string;
  name: string;
  city: string;
  address: string;
  rates: string[];
  longitude: string;
  latitude: string;
};

export type CurISO = keyof typeof CURRENCY_ISO_SYMBOL_MAP;

export type Currency = { symbol: string; name: string };

export interface CurrencyRate {
  code: CurISO;
  value: number;
}

export interface CurrencyRates {
  meta: {
    lastUpdatedAt: string;
  };
  data: Record<CurISO, CurrencyRate>;
}
