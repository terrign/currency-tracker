import { Link } from 'react-router-dom';

import { CUR_ISO_SYMBOL_MAP, CurISO } from '../../constants/currencyISOSymbolMap';
import CurrencySymbol from '../UI/CurrencySymbol';
import * as styles from './styles.module.css';

interface CurrencyCardProps {
  rate: string;
  iso: CurISO;
  // sharedModalPortal?: null;
}

function CurrencyCard({ rate, iso }: CurrencyCardProps) {
  return (
    <Link className={styles.currencyCard} to={`/${iso}`}>
      <CurrencySymbol iso={iso} />
      <div>
        <p className={styles.currencyName}>{CUR_ISO_SYMBOL_MAP[iso].name}</p>
        <p className={styles.currencyRate}>{rate}</p>
      </div>
    </Link>
  );
}

export default CurrencyCard;
