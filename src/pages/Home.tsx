import { CacheAxiosResponse } from 'axios-cache-interceptor';
import { Outlet, useLoaderData } from 'react-router-dom';

import RatesList from '../components/RatesList';
import { CurrencyRates } from '../services/currencyApi.service';

function Home() {
  const res = useLoaderData() as CacheAxiosResponse<CurrencyRates>;

  return (
    <>
      <p>Quotes</p>
      {res.data.data && <RatesList data={res.data.data} />}
      <Outlet />
    </>
  );
}

export default Home;
