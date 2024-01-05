import currencyApi from '../services/currencyApi.service';

async function homeLoader() {
  const preferedCurrency = 'USD';

  const result = await currencyApi.getAllCurrencyRates(preferedCurrency);

  return result;
}

export default homeLoader;
