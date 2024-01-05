import { CurISO } from '../../constants/currencyISOSymbolMap';
import { CurrencyRates } from '../../services/currencyApi.service';
import CurrencyCard from '../CurrencyCard';
import * as styles from './styles.module.css';

interface RatesListProps {
  data: CurrencyRates['data'];
}

function RatesList({ data }: RatesListProps) {
  return (
    <div className={styles.ratesList}>
      {Object.keys(data).map((key) => (
        <CurrencyCard key={key} rate={data[key as CurISO].value} iso={key as CurISO} />
      ))}
    </div>
  );
}

export default RatesList;
