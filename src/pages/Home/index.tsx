import { CURRENCY_ISO_SYMBOL_MAP } from '@constants';
import { AutoComplete } from 'components/Autocomplete';
import { RatesList } from 'components/RatesList';
import { useAppContext } from 'hooks/useAppContext';
import { useQueryRates } from 'hooks/useQueryRates';
import { CurISO } from 'models';
import { Outlet } from 'react-router-dom';

export function Home() {
  const { preferredCurrency, setCurrency } = useAppContext();

  const { result } = useQueryRates(preferredCurrency);

  const selectHandler = (key: CurISO) => () => {
    setCurrency(key);
  };

  return (
    <>
      <div>
        Quotes for{' '}
        <AutoComplete
          searchObject={CURRENCY_ISO_SYMBOL_MAP}
          defaultValue={preferredCurrency}
          selectHandler={selectHandler}
          name="preferredCurrency"
        />
      </div>
      {result?.data && <RatesList data={result.data} />}
      <Outlet />
    </>
  );
}
