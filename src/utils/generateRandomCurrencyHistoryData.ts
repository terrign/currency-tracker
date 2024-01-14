import { DAY_IN_MS } from '@constants';
import { ChartDataType } from 'components/Chart';
import { toStringDate } from 'utils';

import {
  getRandomCloseFromBase,
  getRandomHighFromBase,
  getRandomLowFromBase,
  getRandomOpenFromBase,
  randomBetween,
} from './randoms';

export const generateRandomCurrencyHistoryData = (startDate: Date): ChartDataType[] => {
  const month = startDate.getMonth();
  const year = startDate.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const result: ChartDataType[] = [];

  let currentRate = Math.random() * 10 ** randomBetween(-3, 3);

  let currentDate = startDate.getTime();

  for (let i = 0; i <= daysInMonth; i += 1) {
    const rateOpen = Number(getRandomOpenFromBase(currentRate).toFixed(12));
    const rateClose = Number(getRandomCloseFromBase(currentRate).toFixed(12));
    const rateHigh = Number(getRandomHighFromBase(currentRate).toFixed(12));
    const rateLow = Number(getRandomLowFromBase(currentRate).toFixed(12));
    const date = toStringDate(new Date(currentDate));

    result.push({ x: date, y: [rateOpen, rateHigh, rateLow, rateClose] });

    currentRate = rateClose;
    currentDate += DAY_IN_MS;
  }

  return result;
};
