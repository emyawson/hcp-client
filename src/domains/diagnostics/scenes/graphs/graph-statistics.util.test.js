import {
  roundToNDecimalPlaces,
  calculateHighBloodGlucoseIndex,
  calculateLowBloodGlucoseIndex,
} from './graph-statistics.util';

describe('roundToNDecimalPlaces', () => {
  it('should round to 2 decimal places for non zero values', () => {
    const expected = 1.23;
    const actual = roundToNDecimalPlaces(1.2345, 2);

    expect(actual).toBe(expected);
  });
});

describe('calculateHighBloodGlucoseIndex', () => {
  it('should output the calculated high blood glucose index', () => {
    const bgis = [{ value: 20 }, { value: 600 }];
    const expected = 49.95;
    const actual = calculateHighBloodGlucoseIndex(bgis);

    expect(actual).toBe(expected);
  });
});

describe('calculateLowBloodGlucoseIndex', () => {
  it('should output the calculated low blood glucose index', () => {
    const bgis = [{ value: 20 }, { value: 600 }];
    const expected = 50;
    const actual = calculateLowBloodGlucoseIndex(bgis);

    expect(actual).toBe(expected);
  });
});
