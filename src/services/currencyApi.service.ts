import { CACHE_EXPIRATION_TIME_MS, CURRENCY_LIST } from '@constants';
import axios from 'axios';
import { AxiosCacheInstance, buildWebStorage, CacheAxiosResponse, setupCache } from 'axios-cache-interceptor';
import { CurISO, CurrencyRates } from 'types';

class CurrencyApi {
  private api: AxiosCacheInstance;

  constructor() {
    this.api = setupCache(
      axios.create({
        baseURL: process.env.CURRENCY_API_URL,
        headers: {
          apikey: process.env.CURRENCY_API_KEY,
        },
        adapter: ['http', 'xhr'],
      }),
      {
        storage: buildWebStorage(localStorage, 'currencyapi-cache'),
        ttl: CACHE_EXPIRATION_TIME_MS,
        headerInterpreter: () => CACHE_EXPIRATION_TIME_MS,
      },
    );
  }

  public getAllCurrencyRates(iso: CurISO): Promise<CacheAxiosResponse<CurrencyRates>> {
    return this.api.get(`/latest/`, {
      params: {
        base_currency: iso,
        currencies: CURRENCY_LIST,
      },
    });
  }
}

export const currencyApi = new CurrencyApi();
