import axios, { AxiosInstance } from 'axios';

class CurrencyApi {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.currencyapi.com/v3/',
      headers: {
        apikey: 'cur_live_9TPgHZzZrB7uPZqsMkOXDqYgV3gekPGDGgZ8s1B7',
      },
    });
  }

  public getAllCurrencyRates(iso: string) {
    return this.api.get(`/latest/`, {
      params: {
        base_currency: iso,
      },
    });
  }
}

const currencyApi = new CurrencyApi();

export default currencyApi;
