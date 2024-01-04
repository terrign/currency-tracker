import axios, { AxiosInstance } from 'axios';

interface GetCurrencyHistoryArgs {
  baseCurrency: string;
  compareCurrency: string;
  startDate: string;
  endDate: string;
}

interface HistoryRes {
  time_period_start: string;
  rate_open: number;
  rate_high: number;
  rate_close: number;
  rate_low: number;
}

class CoinApi {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://rest.coinapi.io/v1/',
      headers: {
        // 'X-CoinAPI-Key': 'A93B6EA9-D8E6-4620-AD42-00A7CC968AEB',
        'X-CoinAPI-Key': 'E851DE18-963A-467A-9732-34C873BF2BBD',
      },
    });
  }

  public getCurrencyHistory({
    baseCurrency,
    compareCurrency,
    startDate,
    endDate,
  }: GetCurrencyHistoryArgs): Promise<{ data: HistoryRes[] }> {
    return this.api.get(`/exchangerate/${baseCurrency}/${compareCurrency}/history/?limit=1000`, {
      params: {
        time_start: startDate,
        time_end: endDate,
        period_id: '1DAY',
      },
    });
  }
}

const coinApi = new CoinApi();

export default coinApi;
