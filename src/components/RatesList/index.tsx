import { CUR_ISO_SYMBOL_MAP, CurISO } from '../../constants/currencyISOSymbolMap';
import useAppContext from '../../context/App/hook';
import { CurrencyRates } from '../../services/currencyApi.service';
import CurrencyCard from '../CurrencyCard';
import * as styles from './styles.module.css';

interface RatesListProps {
  data: CurrencyRates['data'];
}

function RatesList({ data }: RatesListProps) {
  const { preferredCurrency } = useAppContext();
  return (
    <div className={styles.ratesList}>
      {Object.keys(data)
        .filter((key) => key !== preferredCurrency)
        .map((key) => (
          <CurrencyCard
            key={key}
            rate={`${data[key as CurISO].value}${CUR_ISO_SYMBOL_MAP[key].symbol}`}
            iso={key as CurISO}
          />
        ))}
    </div>
  );
}

export default RatesList;
