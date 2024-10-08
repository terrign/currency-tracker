import { useCallback, useEffect, useState } from 'react';
import { currencyApi } from 'services/currencyApi.service';
import { notificationObserver } from 'services/Observer';
import { CurISO, CurrencyRates, NotificationStatus } from 'types';

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
      notificationObserver.notify({
        status: NotificationStatus.ERROR,
        header: 'Failed to fetch',
        info: (e as Error).message ?? '',
      });
    }
  }, [iso]);

  useEffect(() => {
    getRates();
  }, [iso, getRates]);

  return { result };
};
