import { CURRENCY_ISO_SYMBOL_MAP } from '@constants';
import { AutoComplete } from 'components/Autocomplete';
import { CurrencySymbol } from 'components/CurrencyCard/CurrencySymbol';
import { useAppContext } from 'hooks/useAppContext';
import { useQueryRates } from 'hooks/useQueryRates';
import { CurISO } from 'models';
import { useState } from 'react';

import * as styles from './styles.module.css';

export function CurrencyModalContent({ iso }: { iso: CurISO }) {
  const { preferredCurrency } = useAppContext();

  const [currency, setCurrency] = useState(() => preferredCurrency);

  const { result } = useQueryRates(iso);

  const selectHandler = (key: CurISO) => () => {
    setCurrency(key);
  };

  return (
    <div className={styles.currencyModal}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <CurrencySymbol iso={iso} />
        <p className={styles.currencyName}>{CURRENCY_ISO_SYMBOL_MAP[iso].name}</p>
      </div>

      <div>
        <span>Compare to </span>
        <AutoComplete
          searchObject={CURRENCY_ISO_SYMBOL_MAP}
          defaultValue={preferredCurrency as CurISO}
          selectHandler={selectHandler}
        />
      </div>

      <p>Rate: {result && `${result.data[currency!].value}${CURRENCY_ISO_SYMBOL_MAP[currency!].symbol}`}</p>
    </div>
  );
}
