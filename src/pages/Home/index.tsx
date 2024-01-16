import { CURRENCY_ISO_SYMBOL_MAP } from '@constants';
import { AutoComplete } from 'components/Autocomplete';
import { RatesList } from 'components/RatesList';
import { useAppContext } from 'hooks/useAppContext';
import { useQueryRates } from 'hooks/useQueryRates';
import { CurISO } from 'types';

import * as styles from './styles.module.css';

export function Home() {
  const { preferredCurrency, setCurrency } = useAppContext();

  const { result } = useQueryRates(preferredCurrency);

  const selectHandler = (key: CurISO) => () => {
    setCurrency(key);
  };

  return (
    <section className={styles.homeWrapper}>
      <h2>
        Quotes for{' '}
        <AutoComplete
          searchObject={CURRENCY_ISO_SYMBOL_MAP}
          defaultValue={preferredCurrency}
          selectHandler={selectHandler}
          name="preferredCurrency"
        />
      </h2>
      {result?.data && <RatesList data={result.data} />}
    </section>
  );
}
