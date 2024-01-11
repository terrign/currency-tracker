import axios from 'axios';
import { AxiosCacheInstance, CacheAxiosResponse, setupCache } from 'axios-cache-interceptor';

// import { resMock } from '../../__test__/__mocks__/resMock';
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
  // // @ts-expect-error testing only
  private api: AxiosCacheInstance;

  constructor() {
    // if (process.env.NODE_ENV === 'test') {
    //   return;
    // }
    this.api = setupCache(
      axios.create({
        baseURL: 'https://api.currencyapi.com/v3/',
        headers: {
          apikey: 'cur_live_9TPgHZzZrB7uPZqsMkOXDqYgV3gekPGDGgZ8s1B7',
        },
        adapter: ['http', 'xhr'],
      }),
      {
        storage: axiosCacheStorage,
        ttl: CACHE_EXPIRATION_TIME_MS,
        headerInterpreter: () => CACHE_EXPIRATION_TIME_MS,
      },
    );
  }

  public getAllCurrencyRates(iso: CurISO): Promise<CacheAxiosResponse<CurrencyRates>> {
    // if (process.env.NODE_ENV === 'test') {
    //   // @ts-expect-error testing only
    //   return Promise.resolve({ data: resMock });
    // }
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
