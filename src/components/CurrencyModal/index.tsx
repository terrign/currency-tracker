import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';

import { CUR_ISO_SYMBOL_MAP, CurISO } from '../../constants/currencyISOSymbolMap';
import useAppContext from '../../context/App/hook';
import currencyApi, { CurrencyRate } from '../../services/currencyApi.service';
import AutoComplete from '../Autocomplete';
import CurrencySymbol from '../UI/CurrencySymbol';
import * as styles from './styles.module.css';

function CurrencyModal() {
  const nav = useNavigate();
  const { preferredCurrency } = useAppContext();
  const { currencyISO } = useParams();
  const iso = currencyISO as CurISO;
  const [result, setResult] = useState<CurrencyRate>();
  const [compareCurrency, setCompareCurrency] = useState(preferredCurrency as CurISO);

  const backGroundClickbackHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      nav('/');
    }
  };

  const closeButtonHandler = () => {
    nav('/');
  };

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

  return createPortal(
    <div className={styles.modalBackground} aria-hidden onClick={backGroundClickbackHandler}>
      <div className={styles.modal}>
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

        <button type="button" onClick={closeButtonHandler} className={styles.closeButton}>
          {' '}
        </button>
      </div>
    </div>,
    document.body,
  );
}

export default CurrencyModal;
