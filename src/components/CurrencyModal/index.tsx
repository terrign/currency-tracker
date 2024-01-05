import { ChangeEvent, MouseEvent, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';

import { CUR_ISO_SYMBOL_MAP, CurISO } from '../../constants/currencyISOSymbolMap';
import CurrencySymbol from '../UI/CurrencySymbol';
import * as styles from './styles.module.css';

function CurrencyModal() {
  const [compareCurrencyValue, setCompareCurrencyValue] = useState('');
  const nav = useNavigate();
  const { currencyISO } = useParams();
  const iso = currencyISO as CurISO;

  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setCompareCurrencyValue(e.target.value);
  };

  const backGroundClickbackHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      nav('/');
    }
  };

  const closeButtonHandler = () => {
    nav('/');
  };

  return createPortal(
    <div className={styles.modalBackground} aria-hidden onClick={backGroundClickbackHandler}>
      <div className={styles.modal}>
        <CurrencySymbol iso={iso} />
        <p className={styles.modalCurName}>{CUR_ISO_SYMBOL_MAP[iso].name}</p>

        <select id="baseCurrency" value={compareCurrencyValue} onChange={changeHandler}>
          {Object.keys(CUR_ISO_SYMBOL_MAP).map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <button type="button" onClick={closeButtonHandler} className={styles.closeButton}>
          {' '}
        </button>
      </div>
    </div>,
    document.body,
  );
}

export default CurrencyModal;
