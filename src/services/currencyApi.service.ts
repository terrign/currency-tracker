import axios from 'axios';
import { AxiosCacheInstance, CacheAxiosResponse, setupCache } from 'axios-cache-interceptor';

import { CUR_LIST, CurISO } from '../constants/currencyISOSymbolMap';
import { CACHE_EXPIRATION_TIME_MS } from '../constants/globals';
import axiosCacheStorage from '../utils/axiosCacheStorage';

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
        storage: axiosCacheStorage,
        ttl: CACHE_EXPIRATION_TIME_MS,
        headerInterpreter: () => CACHE_EXPIRATION_TIME_MS,
      },
    );
  }

  public getAllCurrencyRates(iso: CurISO): Promise<CacheAxiosResponse<CurrencyRates>> {
    return this.api.get(`/latest/`, {
      params: {
        base_currency: iso,
        currencies: CUR_LIST,
      },
      id: 'currency-rates',
      cache: {
        update: {
          'currency-rates': (cache, res) => {
            if (cache) {
              const cacheDay = new Date(cache.createdAt!).getDate();
              const resDay = new Date(res.data.data.createdAt).getDate();
              if (cacheDay < resDay) {
                return 'delete';
              }
            }
            return 'ignore';
          },
        },
      },
    });
  }
}

const currencyApi = new CurrencyApi();

export default currencyApi;
