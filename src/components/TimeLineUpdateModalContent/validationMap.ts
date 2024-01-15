interface ValidationFuncParams {
  open: number;
  high: number;
  low: number;
  close: number;
}

export const VALIDATION_MAP = {
  open: {
    validationFunc: ({ open, high, low }: ValidationFuncParams) => open < low || open > high,
    errorMessage: '"Open" must be higher then "Low" and less then "High"',
  },
  high: {
    validationFunc: ({ open, high, low, close }: ValidationFuncParams) => high < Math.max(open, low, close),
    errorMessage: '"High" must be the highest',
  },
  low: {
    validationFunc: ({ open, high, low, close }: ValidationFuncParams) => low > Math.min(open, high, close),
    errorMessage: '"Low" must be the least',
  },
  close: {
    validationFunc: ({ high, low, close }: ValidationFuncParams) => close < low || close > high,
    errorMessage: '"Close" must be higher then "Low" and less then "High"',
  },
};
