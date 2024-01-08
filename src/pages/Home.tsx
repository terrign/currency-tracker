import { CacheAxiosResponse } from 'axios-cache-interceptor';
import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import AutoComplete from '../components/Autocomplete';
import RatesList from '../components/RatesList';
import { CUR_ISO_SYMBOL_MAP, CurISO } from '../constants/currencyISOSymbolMap';
import useAppContext from '../context/App/hook';
import currencyApi, { CurrencyRates } from '../services/currencyApi.service';

function Home() {
  const { preferredCurrency, dispatch } = useAppContext();
  const [res, setRes] = useState<CacheAxiosResponse<CurrencyRates>>();

  const refetchData = useCallback(async () => {
    if (preferredCurrency) {
      const result = await currencyApi.getAllCurrencyRates(preferredCurrency as CurISO);
      setRes(result);
    }
  }, [preferredCurrency]);

  useEffect(() => {
    refetchData();
  }, [preferredCurrency, refetchData]);

  const selectHandler = (key: CurISO) => () => {
    dispatch!({ type: 'preferredCurrency', payload: key });
  };

  return (
    <>
      <div style={{}}>
        Quotes for{' '}
        <AutoComplete
          searchObject={CUR_ISO_SYMBOL_MAP}
          defaultValue={preferredCurrency ?? 'USD'}
          selectHandler={selectHandler}
          name="preferredCurrency"
        />
      </div>
      {res?.data.data && <RatesList data={res.data.data} />}
      <Outlet />
    </>
  );
}

export default Home;
