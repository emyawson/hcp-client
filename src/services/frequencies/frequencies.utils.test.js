import { TWO_WEEKS, ONE_MONTH, ONE_MONTH_HALF } from './frequencies.constant';
import { frequencyToString, stringToFrequency } from './frequencies.utils';

const weeksData = {
  duration: 2,
  unit: 'weeks',
};

const monthData = {
  duration: 1,
  unit: 'months',
};

const monthsData = {
  duration: 6,
  unit: 'weeks',
};

describe('Frequencies Service utilities', () => {
  test('Client: Formats two weeks as string', () => {
    expect(frequencyToString(weeksData)).toBe(TWO_WEEKS);
  });
  test('Client: Formats one month as string', () => {
    expect(frequencyToString(monthData)).toBe(ONE_MONTH);
  });
  test('Client: Formats one and a half months as string', () => {
    expect(frequencyToString(monthsData)).toBe(ONE_MONTH_HALF);
  });

  test('Server: Formats two weeks from string', () => {
    expect(stringToFrequency(TWO_WEEKS)).toEqual(weeksData);
  });
  test('Server: Formats one month fron string', () => {
    expect(stringToFrequency(ONE_MONTH)).toEqual(monthData);
  });
  test('Server: Formats one and a half months from string', () => {
    expect(stringToFrequency(ONE_MONTH_HALF)).toEqual(monthsData);
  });
  test('Client: Formats an invalid frequency as null', () => {
    expect(frequencyToString(undefined)).toBe(null);
  });
  test('Client: Formats an invalid frequency as a frequency with null values', () => {
    expect(stringToFrequency(undefined)).toEqual({
      duration: null,
      unit: null,
    });
  });
});
