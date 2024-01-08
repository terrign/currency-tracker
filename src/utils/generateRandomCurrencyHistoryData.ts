import { ChartDataType } from '../components/ApexChart';
import { toStringDate } from './date';
import {
  getRandomCloseFromBase,
  getRandomHighFromBase,
  getRandomLowFromBase,
  getRandomOpenFromBase,
  randomBetween,
} from './randoms';

export const DAY_IN_MS = 86_400_000;

export const generateRandomCurrencyHistoryData = (startDate: Date): ChartDataType[] => {
  const month = startDate.getMonth();
  const year = startDate.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const result: ChartDataType[] = [];

  let currentRate = Math.random() * 10 ** randomBetween(-3, 3);

  let currentDate = startDate.getTime();

  for (let i = 0; i <= daysInMonth; i += 1) {
    const rateOpen = getRandomOpenFromBase(currentRate);
    const rateClose = getRandomCloseFromBase(currentRate);
    const rateHigh = getRandomHighFromBase(currentRate);
    const rateLow = getRandomLowFromBase(currentRate);
    const date = toStringDate(new Date(currentDate));

    result.push({ x: date, y: [rateOpen, rateHigh, rateLow, rateClose] });

    currentRate = rateClose;
    currentDate += DAY_IN_MS;
  }

  return result;
};
