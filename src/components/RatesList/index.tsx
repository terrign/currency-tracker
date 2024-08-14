import { CURRENCY_ISO_SYMBOL_MAP } from '@constants';
import { useAppContext } from 'hooks/useAppContext';
import { CurrencyRates } from 'types';

import { CurrencyCard } from '../CurrencyCard';
import * as styles from './styles.module.css';

interface RatesListProps {
  data: CurrencyRates['data'];
}

export function RatesList({ data }: RatesListProps) {
  const { preferredCurrency } = useAppContext();
  return (
    <section className={styles.ratesList}>
      {Object.keys(data)
        .filter((key) => key !== preferredCurrency)
        .map((key) => (
          <CurrencyCard key={key} rate={`${data[key].value}${CURRENCY_ISO_SYMBOL_MAP[key].symbol}`} iso={key} />
        ))}
    </section>
  );
}
