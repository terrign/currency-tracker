import { CUR_ISO_SYMBOL_MAP, CurISO } from '../../../constants/currencyISOSymbolMap';
import * as styles from './styles.module.css';

function CurrencySymbol({ iso }: { iso: CurISO }) {
  return <span className={styles.currencySymbol}>{CUR_ISO_SYMBOL_MAP[iso].symbol}</span>;
}

export default CurrencySymbol;
