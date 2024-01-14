import { useCallback, useEffect, useState } from 'react';

import { CurISO } from '../constants/currencyISOSymbolMap';
import { currencyApi, CurrencyRates } from '../services/currencyApi.service';
import { notification } from '../utils/Observer';

export const useQueryRates = (iso: CurISO | null) => {
  const [result, setResult] = useState<CurrencyRates | null>();

  const getRates = useCallback(async () => {
    if (!iso) {
      setResult(null);
      return;
    }
    try {
      const res = await currencyApi.getAllCurrencyRates(iso);
      setResult(res.data);
    } catch (e) {
      notification.notify({ status: 'error', header: 'Failed to fetch', info: (e as Error).message ?? '' });
    }
  }, [iso]);

  useEffect(() => {
    getRates();
  }, [iso, getRates]);

  return { result };
};
