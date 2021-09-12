import { standardDeviation } from 'src/domains/diagnostics/utils';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';

import { getFormattedStandardDeviation } from './stat.util';

describe('getFormattedStandardDeviation test suite', () => {
  it('should get the placeholder value for an array of length < 2', () => {
    expect(getFormattedStandardDeviation([])).toBe(EMPTY_VALUE_PLACEHOLDER);
    expect(getFormattedStandardDeviation([15])).toBe(EMPTY_VALUE_PLACEHOLDER);
  });

  it('should correctly calculate standard deviation of an array of numbers', () => {
    expect(getFormattedStandardDeviation([22.3, 22.3])).toBe(0);

    const arrayOfNumbers = [23, 45, 67, 87, 24, 23];
    const expected = standardDeviation(arrayOfNumbers);
    expect(getFormattedStandardDeviation(arrayOfNumbers)).toEqual(expected);
  });

  it('should correctly format the result (if not empty) using the supplied function', () => {
    const arrayOfNumbers = [23, 45, 67, 87, 24, 23];
    expect(getFormattedStandardDeviation(arrayOfNumbers, Math.round)).toEqual(
      27,
    );
    expect(
      getFormattedStandardDeviation(arrayOfNumbers, value => value.toFixed(3)),
    ).toEqual('27.044');
  });
});
