import { DAY_IN_MS } from '@constants';
import { ChartDataType } from 'types';
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

  let currentRate = Math.random() * 10 ** randomBetween(-4, 4);

  let currentDate = startDate.getTime();

  for (let i = 0; i <= daysInMonth; i += 1) {
    const rateOpen = getRandomOpenFromBase(currentRate);
    const rateClose = getRandomCloseFromBase(rateOpen);
    const rateHigh = getRandomHighFromBase(Math.max(rateOpen, rateClose));
    const rateLow = getRandomLowFromBase(Math.min(rateOpen, rateClose));
    const date = toStringDate(new Date(currentDate));

    result.push({ x: date, y: [rateOpen, rateHigh, rateLow, rateClose] });

    currentRate = rateClose;
    currentDate += DAY_IN_MS;
  }

  return result;
};
