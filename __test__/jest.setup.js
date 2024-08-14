import { currencyRatesResMock } from 'mocks/currencyRatesResMock';
import { currencyApi } from 'services/currencyApi.service';
jest.spyOn(currencyApi, 'getAllCurrencyRates').mockReturnValue(Promise.resolve({ data: currencyRatesResMock }));
