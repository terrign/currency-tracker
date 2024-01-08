import { useCallback, useEffect, useState } from 'react';

import { CUR_ISO_SYMBOL_MAP, CurISO } from '../../constants/currencyISOSymbolMap';
import useAppContext from '../../context/App/hook';
import currencyApi, { CurrencyRate } from '../../services/currencyApi.service';
import AutoComplete from '../Autocomplete';
import CurrencySymbol from '../UI/CurrencySymbol';
import * as styles from './styles.module.css';

function CurrencyModalContent({ iso }: { iso: CurISO }) {
  const { preferredCurrency } = useAppContext();
  const [result, setResult] = useState<CurrencyRate>();
  const [compareCurrency, setCompareCurrency] = useState(preferredCurrency as CurISO);

  const getRate = useCallback(async () => {
    const res = await currencyApi.getAllCurrencyRates(iso);
    setResult(res.data.data[compareCurrency]);
  }, [compareCurrency, iso]);

  useEffect(() => {
    getRate();
  }, [getRate]);

  const selectHandler = (key: CurISO) => () => {
    setCompareCurrency(key);
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <CurrencySymbol iso={iso} />
        <p className={styles.modalCurName}>{CUR_ISO_SYMBOL_MAP[iso].name}</p>
      </div>

      <div>
        <span>Compare to</span>
        <AutoComplete
          searchObject={CUR_ISO_SYMBOL_MAP}
          defaultValue={preferredCurrency as CurISO}
          selectHandler={selectHandler}
        />
      </div>

      <p>
        {result && (
          <span>
            {result.value} {CUR_ISO_SYMBOL_MAP[result.code].symbol}
          </span>
        )}
      </p>
    </>
  );
}

export default CurrencyModalContent;
