import axios from 'axios';
import { AxiosCacheInstance, setupCache } from 'axios-cache-interceptor';

import { CACHE_EXPIRATION_TIME_MS } from '../constants/globals';
import axiosCacheStorage from '../utils/axiosCacheStorage';

class BankAPi {
  private api: AxiosCacheInstance;

  constructor() {
    this.api = setupCache(
      axios.create({
        baseURL: 'https://rrb.by/export/get-currency',
      }),
      {
        storage: axiosCacheStorage,
        ttl: CACHE_EXPIRATION_TIME_MS,
        headerInterpreter: () => CACHE_EXPIRATION_TIME_MS,
      },
    );
  }

  public getBankInfo() {
    return this.api.get('/');
  }
}

const bankApi = new BankAPi();

export default bankApi;
