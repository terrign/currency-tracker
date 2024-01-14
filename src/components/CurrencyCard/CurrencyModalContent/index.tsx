import { useState } from 'react';

import { CUR_ISO_SYMBOL_MAP, CurISO } from '../../../constants/currencyISOSymbolMap';
import useAppContext from '../../../hooks/useAppContext';
import useQueryRates from '../../../hooks/useQueryRates';
import AutoComplete from '../../Autocomplete';
import CurrencySymbol from '../CurrencySymbol';
import * as styles from './styles.module.css';

function CurrencyModalContent({ iso }: { iso: CurISO }) {
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
        <p className={styles.curName}>{CUR_ISO_SYMBOL_MAP[iso].name}</p>
      </div>

      <div>
        <span>Compare to </span>
        <AutoComplete
          searchObject={CUR_ISO_SYMBOL_MAP}
          defaultValue={preferredCurrency as CurISO}
          selectHandler={selectHandler}
        />
      </div>

      <p>Rate: {result && `${result.data[currency!].value}${CUR_ISO_SYMBOL_MAP[currency!].symbol}`}</p>
    </div>
  );
}

export default CurrencyModalContent;
