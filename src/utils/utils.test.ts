import { axiosCacheStorage } from './axiosCacheStorage';
import { today, toStringDate } from './date';
import { filterByCurrency } from './filterByCurrency';
import { generateRandomCurrencyHistoryData } from './generateRandomCurrencyHistoryData';
import { includes } from './includes';
import { Observer } from './Observer';
import { randomBetween, randomChangeBase } from './randoms';

describe('Randoms tests', () => {
  it('randomBetween() returns expected value', async () => {
    for (let i = 0; i < 20; i += 1) {
      expect(randomBetween(i, i + 5)).toBeGreaterThanOrEqual(i);
      expect(randomBetween(i, i + 5)).toBeLessThanOrEqual(i + 5);
    }
  });

  it('randomChangeBase() does not return negative numbers', async () => {
    let base = 0.00005;
    for (let i = 0; i < 20; i += 1) {
      const func = randomChangeBase(-10, 1);
      base = func(base);
    }
    expect(base).toBeGreaterThan(0);
  });

  it('includes() returns correct value', async () => {
    let str1 = 'random';
    let str2 = 'RaNdOm';

    expect(includes(str1, str2)).toBe(true);
    expect(includes(str2, str1)).toBe(true);

    str1 = '';
    str2 = '1';

    expect(includes(str1, str2)).toBe(true);
    expect(includes(str2, str1)).toBe(false);
  });

  it('generateRandomCurrencyHistoryData() returns value', () => {
    const res = generateRandomCurrencyHistoryData(new Date(Date.now()));
    expect(res).toBeTruthy();
  });
});

describe('Observer test', () => {
  it('Observer notifies', async () => {
    const obs = new Observer();
    let value = 1;
    const change = () => {
      value += 1;
    };
    obs.subscribe(change);
    obs.notify();
    expect(value).toBe(2);
  });

  it('Observer unsubscribes', async () => {
    const obs = new Observer();
    const func = () => {};
    obs.subscribe(func);
    expect(obs.observers.length).toBe(1);
    obs.unsubscribe(func);
    expect(obs.observers.length).toBe(0);
  });
});

test('filterByCurrency() returns correct values', async () => {
  const res = filterByCurrency('USD');
  const test = res.filter((a) => !a.rates.includes('USD'));
  expect(test.length).toBe(0);
});

describe('date funcs', () => {
  it('toStringDate() return correct value', async () => {
    const str = '2023-12-01';
    const date = new Date(str);
    const res = toStringDate(date);
    expect(res).toBe(str);
  });

  it('today() returns todays date', async () => {
    expect(today()).toBeTruthy();
  });
});

test('axiosCacheStorage has all required methods', async () => {
  const { get, remove, set } = axiosCacheStorage;
  expect(get).toBeTruthy();
  expect(remove).toBeTruthy();
  expect(set).toBeTruthy();
});
