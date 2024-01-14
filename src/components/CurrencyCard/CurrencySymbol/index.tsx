import { CUR_ISO_SYMBOL_MAP } from '@constants';
import { CurISO } from 'models';

import * as styles from './styles.module.css';

export function CurrencySymbol({ iso }: { iso: CurISO }) {
  return <span className={styles.currencySymbol}>{CUR_ISO_SYMBOL_MAP[iso].symbol}</span>;
}
