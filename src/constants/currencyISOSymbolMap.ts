export const CUR_ISO_SYMBOL_MAP = {
  AUD: {
    symbol: 'A$',
    name: 'Australian Dollar',
  },
  BHD: {
    symbol: '.د.ب',
    name: 'Bahraini Dinar',
  },
  BRL: {
    symbol: 'R$',
    name: 'Brazilian Real',
  },
  BTC: {
    symbol: '₿',
    name: 'Bitcoin',
  },
  BYN: {
    symbol: 'Br',
    name: 'Belarusian Ruble',
  },
  CAD: {
    symbol: 'C$',
    name: 'Canadian Dollar',
  },
  CHF: {
    symbol: '₣',
    name: 'Swiss Franc',
  },
  CNY: {
    symbol: '¥',
    name: 'Yuan',
  },
  ETH: {
    symbol: 'Ξ',
    name: 'Etherium',
  },
  EUR: {
    symbol: '€',
    name: 'Euro',
  },
  GBP: {
    symbol: '£',
    name: 'Pound Sterling',
  },
  LTC: {
    symbol: 'Ł',
    name: 'Litecoin',
  },
  RUB: {
    symbol: '₽',
    name: 'Russian Ruble',
  },
  USD: {
    symbol: '$',
    name: 'US Dollar',
  },
  JPY: {
    symbol: '¥',
    name: 'Yen',
  },
};

export const CUR_LIST = Object.keys(CUR_ISO_SYMBOL_MAP).join(',');

export type CurISO = keyof typeof CUR_ISO_SYMBOL_MAP;
