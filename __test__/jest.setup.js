import currencyApi from '../src/services/currencyApi.service';
import { resMock } from './__mocks__/resMock';
jest.spyOn(currencyApi, 'getAllCurrencyRates').mockReturnValue(Promise.resolve({ data: resMock }));
