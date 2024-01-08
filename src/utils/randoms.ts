export const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export const randomChangeBase = (minPercentageDif: number, maxPercentageDif: number) => (base: number) => {
  const dif = randomBetween(minPercentageDif, maxPercentageDif) / 100;

  let newBase = base + base * dif;

  while (newBase < 0) {
    newBase += +(base * dif);
  }
  return newBase;
};

export const getRandomOpenFromBase = randomChangeBase(-1, 1);

export const getRandomCloseFromBase = randomChangeBase(-5, 5);

export const getRandomHighFromBase = randomChangeBase(3, 6);

export const getRandomLowFromBase = randomChangeBase(-6, -3);
