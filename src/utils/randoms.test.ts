import { includes } from './includes';
import { randomBetween, randomChangeBase } from './randoms';

describe('Utils tests', () => {
  it('randomBetween returns expected value', async () => {
    for (let i = 0; i < 20; i += 1) {
      expect(randomBetween(i, i + 5)).toBeGreaterThanOrEqual(i);
      expect(randomBetween(i, i + 5)).toBeLessThanOrEqual(i + 5);
    }
  });

  it('randomChangeBase does not return negative numbers', async () => {
    let base = 0.00005;
    for (let i = 0; i < 20; i += 1) {
      const func = randomChangeBase(-10, 1);
      base = func(base);
    }
    expect(base).toBeGreaterThan(0);
  });

  it('includes returns correct value', async () => {
    let str1 = 'random';
    let str2 = 'RaNdOm';

    expect(includes(str1, str2)).toBe(true);
    expect(includes(str2, str1)).toBe(true);

    str1 = '';
    str2 = '1';

    expect(includes(str1, str2)).toBe(true);
    expect(includes(str2, str1)).toBe(false);
  });
});
