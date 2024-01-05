import axios from 'axios';
import { AxiosCacheInstance, buildWebStorage, CacheAxiosResponse, setupCache } from 'axios-cache-interceptor';

import { CUR_LIST, CurISO } from '../constants/currencyISOSymbolMap';

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

class CurrencyApi {
  private api: AxiosCacheInstance;

  constructor() {
    this.api = setupCache(
      axios.create({
        baseURL: 'https://api.currencyapi.com/v3/',
        headers: {
          apikey: 'cur_live_9TPgHZzZrB7uPZqsMkOXDqYgV3gekPGDGgZ8s1B7',
        },
      }),
      {
        storage: buildWebStorage(localStorage, 'currency-api-cache'),
        ttl: 86400000,
        headerInterpreter: () => 86400000,
      },
    );
  }

  public getAllCurrencyRates(iso: CurISO): Promise<CacheAxiosResponse<CurrencyRates>> {
    return this.api.get(`/latest/`, {
      params: {
        base_currency: iso,
        currencies: CUR_LIST,
      },
    });
  }
}

const currencyApi = new CurrencyApi();

export default currencyApi;
