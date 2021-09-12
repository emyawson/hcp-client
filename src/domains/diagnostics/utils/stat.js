import math from 'mathjs';

export const average = data => {
  if (data.length <= 0) {
    return 0;
  }

  const sum = data.reduce((acc, value) => acc + value, 0);
  return sum / data.length;
};

export const percentage = (amount: number, total: number): number =>
  amount && total ? math.multiply(math.divide(amount, total), 100) : 0;

export const standardDeviation = data => (data.length > 0 ? math.std(data) : 0);

export const fixToDecimalPlace = (value, decimalPlaces) =>
  Number(value.toFixed(decimalPlaces));
