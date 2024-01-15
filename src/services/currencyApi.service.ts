import { CACHE_EXPIRATION_TIME_MS } from '@constants';
import { CURRENCY_LIST } from '@constants';
import axios from 'axios';
import { AxiosCacheInstance, buildWebStorage, CacheAxiosResponse, setupCache } from 'axios-cache-interceptor';
import { CurISO, CurrencyRates } from 'models';

class CurrencyApi {
  private api: AxiosCacheInstance;

  constructor() {
    this.api = setupCache(
      axios.create({
        baseURL: 'https://api.currencyapi.com/v3/',
        headers: {
          // apikey: 'cur_live_9TPgHZzZrB7uPZqsMkOXDqYgV3gekPGDGgZ8s1B7',
          apikey: 'cur_live_jR8JoknFqGzwa3Da5vonQXNwpQHkkUBrzZYgyhE9',
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
