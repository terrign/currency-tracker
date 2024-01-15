export const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export const randomChangeBase = (minPercentageDif: number, maxPercentageDif: number) => {
  const inner = (base: number) => {
    const dif = randomBetween(minPercentageDif, maxPercentageDif) / 100;

    let newBase = base + base * dif;

    while (newBase < 0) {
      newBase += +(base * dif);
    }

    while (newBase.toFixed(9) === base.toFixed(9)) {
      newBase = inner(newBase);
    }
    return Number(newBase.toFixed(9));
  };
  return inner;
};

export const getRandomOpenFromBase = randomChangeBase(-0.5, 0.5);

export const getRandomCloseFromBase = randomChangeBase(-5, 5);

export const getRandomHighFromBase = randomChangeBase(1, 5);

export const getRandomLowFromBase = randomChangeBase(-5, -1);
