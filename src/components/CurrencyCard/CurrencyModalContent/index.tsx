import { CURRENCY_ISO_SYMBOL_MAP } from '@constants';
import { AutoComplete } from 'components/Autocomplete';
import { CurrencySymbol } from 'components/CurrencyCard/CurrencySymbol';
import { useAppContext } from 'hooks/useAppContext';
import { useQueryRates } from 'hooks/useQueryRates';
import { useState } from 'react';
import { CurISO } from 'types';

import * as styles from './styles.module.css';

export function CurrencyModalContent({ iso }: { iso: CurISO }) {
  const { preferredCurrency } = useAppContext();

  const [currency, setCurrency] = useState(() => preferredCurrency);

  const { result } = useQueryRates(iso);

  const selectHandler = (key: CurISO) => () => {
    setCurrency(key);
  };

  return (
    <section className={styles.currencyModal}>
      <h4 className={styles.currencyModalHeading}>
        <CurrencySymbol iso={iso} />
        <p className={styles.currencyName}>
          <span>{CURRENCY_ISO_SYMBOL_MAP[iso].name}</span>
        </p>
      </h4>

      <div>
        <span>Compare to </span>
        <AutoComplete
          searchObject={CURRENCY_ISO_SYMBOL_MAP}
          defaultValue={preferredCurrency}
          selectHandler={selectHandler}
        />
      </div>

      <p>Rate: {result && `${result.data[currency].value}${CURRENCY_ISO_SYMBOL_MAP[currency].symbol}`}</p>
    </section>
  );
}
