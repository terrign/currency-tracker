import { CURRENCY_ISO_SYMBOL_MAP } from '@constants';

export type NoProps = Readonly<unknown>;

export type BankMapInfo = {
  id: string;
  name: string;
  city: string;
  address: string;
  rates: string[];
  longitude: string;
  latitude: string;
};

export type ChartDataType = { x: string; y: number[] };

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

export enum OHLC {
  OPEN = 'open',
  HIGH = 'high',
  LOW = 'low',
  CLOSE = 'close',
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum LocalStorageKeys {
  PREFERRED_CURRENCY = 'preferredCurrency',
  THEME = 'theme',
}

export enum Route {
  HOME = '/',
  TIMELINE = '/timeline',
  BANKMAP = '/bankmap',
  CONTACTS = '/contacts',
}

export enum NotificationStatus {
  ERROR,
  SUCCESS,
  WARNING,
}
