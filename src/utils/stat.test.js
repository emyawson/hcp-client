import {
  average,
  fixToDecimalPlace,
  percentage,
  standardDeviation,
} from './stat';

describe('average test suite', () => {
  it('should correctly calculate the average', () => {
    const input = [4, 7, 8, 2, 57, 35];
    expect(average(input)).toBeCloseTo(18.833, 3);
    expect(average([4])).toBeCloseTo(4);
  });
  it('should return 0 for empty array', () => {
    const input = [];
    expect(average(input)).toBeCloseTo(0);
  });
});

describe('fixToDecimalPlace test suite', () => {
  it('should correctly fix the input value to the specified number of decimal places', () => {
    expect(fixToDecimalPlace(14.555555, 3)).toBeCloseTo(14.556, 3);
    expect(fixToDecimalPlace(399.98, 0)).toBeCloseTo(400);
  });
});

describe('percentage test suite', () => {
  it('should correctly return the percentage from amount of total', () => {
    expect(percentage(0.25, 1)).toBeCloseTo(25);
    expect(percentage(4, 12)).toBeCloseTo(33.33);
    expect(percentage(12, 4)).toBeCloseTo(300);
  });
});

describe('standardDeviation test suite', () => {
  it('should return 0 if input length is <= 1', () => {
    expect(standardDeviation([])).toBeCloseTo(0);
    expect(standardDeviation([75])).toBeCloseTo(0);
  });
  it('should correctly return the standard deviation for supplied input', () => {
    const input = [2, 16, 43, 55];
    expect(standardDeviation(input)).toBeCloseTo(24.29);
  });
});
