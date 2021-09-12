import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';

import {
  getFormattedBloodGlucoseIndex,
  calculateBloodGlucoseIndex,
} from './graph-statistics.util';

describe('getFormattedBloodGlucoseIndex test suite', () => {
  it('should return placeholder for an empty array', () => {
    const returnInput = input => input;
    expect(getFormattedBloodGlucoseIndex(returnInput, [])).toBe(
      EMPTY_VALUE_PLACEHOLDER,
    );
  });

  it('should run supplied function on measurements, then return result rounded to one decimal place', () => {
    const sum = data => data.reduce((acc, value) => acc + value, 0);
    const input = [3, 4.0134, 7, 5.5];
    expect(getFormattedBloodGlucoseIndex(sum, input)).toBe('19.5');
  });
});

describe('calculateBloodGlucoseIndex', () => {
  it('should calculate the blood glucose index value rounded to 1 decimal place', () => {
    const expected = { bg: 99, bgIndex: 0.6 };
    const actual = calculateBloodGlucoseIndex(99);
    expect(actual).toEqual(expected);
  });

  it('should use BG value of 20 if BG is less than 20', () => {
    const expected = calculateBloodGlucoseIndex(20);
    const actual = calculateBloodGlucoseIndex(10);

    expect(actual).toEqual(expected);
  });

  it('should use BG value of 600 if BG is greater than 600', () => {
    const expected = calculateBloodGlucoseIndex(600);
    const actual = calculateBloodGlucoseIndex(700);

    expect(actual).toEqual(expected);
  });
});
