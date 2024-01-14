import { CUR_ISO_SYMBOL_MAP } from '@constants';
import { AutoComplete } from 'components/Autocomplete';
import { RatesList } from 'components/RatesList';
import { useAppContext } from 'hooks/useAppContext';
import { useQueryRates } from 'hooks/useQueryRates';
import { CurISO } from 'models';
import { Outlet } from 'react-router-dom';

export function Home() {
  const { preferredCurrency, dispatch } = useAppContext();

  const { result } = useQueryRates(preferredCurrency);

  const selectHandler = (key: CurISO) => () => {
    dispatch({ type: 'preferredCurrency', payload: key });
  };

  return (
    <>
      <div>
        Quotes for{' '}
        <AutoComplete
          searchObject={CUR_ISO_SYMBOL_MAP}
          defaultValue={preferredCurrency ?? 'USD'}
          selectHandler={selectHandler}
          name="preferredCurrency"
        />
      </div>
      {result?.data && <RatesList data={result.data} />}
      <Outlet />
    </>
  );
}
