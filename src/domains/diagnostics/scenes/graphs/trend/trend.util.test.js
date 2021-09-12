import { Settings } from 'luxon';

import { convertISOToJsGMT } from 'src/domains/diagnostics/utils';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';

import {
  generateDayRange,
  convertDaysToDayTicks,
  convertDaysToMonthYearTicks,
  sortValuesByDate,
  calculateDailyStats,
} from './trend.util';

const startDate = convertISOToJsGMT('Feb 5 2018 GMT+0000');
const endDate = convertISOToJsGMT('Feb 10 2018 GMT+0000');

const dayRange = [
  {
    day: '5',
    daysInMonth: 28,
    isThursday: false,
    isWednesday: false,
    isWeekend: false,
    month: 'FEB',
    year: '2018',
  },
  {
    day: '6',
    daysInMonth: 28,
    isThursday: false,
    isWednesday: false,
    isWeekend: false,
    month: 'FEB',
    year: '2018',
  },
  {
    day: '7',
    daysInMonth: 28,
    isThursday: false,
    isWednesday: true,
    isWeekend: false,
    month: 'FEB',
    year: '2018',
  },
  {
    day: '8',
    daysInMonth: 28,
    isThursday: true,
    isWednesday: false,
    isWeekend: false,
    month: 'FEB',
    year: '2018',
  },
  {
    day: '9',
    daysInMonth: 28,
    isThursday: false,
    isWednesday: false,
    isWeekend: false,
    month: 'FEB',
    year: '2018',
  },
  {
    day: '10',
    daysInMonth: 28,
    isThursday: false,
    isWednesday: false,
    isWeekend: true,
    month: 'FEB',
    year: '2018',
  },
];

const dayRange2Month = [
  {
    day: '31',
    month: 'JAN',
    daysInMonth: 31,
    year: '2018',
    isWeekend: false,
    isWednesday: true,
    isThursday: false,
  },
  {
    day: '1',
    month: 'FEB',
    daysInMonth: 28,
    year: '2018',
    isWeekend: false,
    isWednesday: false,
    isThursday: false,
  },
];

const glucoseMeasurements = [
  {
    date: convertISOToJsGMT('Feb 5 2018 12:00:00'),
    beforeMeal: true,
    afterMeal: false,
    aboveTargetRange: true,
    belowTargetRange: false,
    hypoSymptoms: false,
    value: 230,
  },
  {
    date: convertISOToJsGMT('Feb 5 2018 12:00:00'),
    beforeMeal: false,
    afterMeal: true,
    aboveTargetRange: true,
    belowTargetRange: false,
    hypoSymptoms: false,
    value: 300,
  },
  {
    date: convertISOToJsGMT('Feb 6 2018 12:00:00'),
    beforeMeal: false,
    afterMeal: true,
    aboveTargetRange: true,
    belowTargetRange: false,
    hypoSymptoms: false,
    value: 479,
  },
];

describe('Trend Utils', () => {
  beforeEach(() => {
    Settings.defaultLocale = 'en'; // To ensure that the unit tests run in en
  });

  describe('generateDayRange', () => {
    it('should generate day range', () => {
      const expected = dayRange;
      const actual = generateDayRange(startDate, endDate);

      expect(actual).toEqual(expected);
    });
  });

  describe('convertDaysToDayTicks', () => {
    it('should convert day range to day ticks', () => {
      const expected = [
        {
          value: 0,
          label: '5',
          isWeekend: false,
          drawLongTick: false,
        },
        {
          value: 1 / 6,
          label: '6',
          isWeekend: false,
          drawLongTick: false,
        },
        {
          value: 2 / 6,
          label: '7',
          isWeekend: false,
          drawLongTick: false,
        },
        {
          value: 3 / 6,
          label: '8',
          isWeekend: false,
          drawLongTick: false,
        },
        {
          value: 4 / 6,
          label: '9',
          isWeekend: false,
          drawLongTick: false,
        },
        {
          value: 5 / 6,
          label: '10',
          isWeekend: true,
          drawLongTick: false,
        },
      ];
      const actual = convertDaysToDayTicks(dayRange);

      expect(actual).toEqual(expected);
    });

    it('should convert only wednesdays and weekends to day ticks', () => {
      const expected = [
        {
          value: 0,
          label: null,
          isWeekend: false,
          drawLongTick: false,
        },
        {
          value: 1 / 6,
          label: null,
          isWeekend: false,
          drawLongTick: false,
        },
        {
          value: 2 / 6,
          label: '7',
          isWeekend: false,
          drawLongTick: true,
        },
        {
          value: 3 / 6,
          label: null,
          isWeekend: false,
          drawLongTick: true,
        },
        {
          value: 4 / 6,
          label: null,
          isWeekend: false,
          drawLongTick: false,
        },
        {
          value: 5 / 6,
          label: null,
          isWeekend: true,
          drawLongTick: false,
        },
      ];
      const actual = convertDaysToDayTicks(dayRange, 2);

      expect(actual).toEqual(expected);
    });
  });

  describe('convertDaysToMonthYearTicks', () => {
    it('should convert dayRange to month-year ticks', () => {
      const expected = [
        {
          value: 0,
          label: 'FEB / 2018',
          daysLeftInMonth: 24,
        },
      ];
      const actual = convertDaysToMonthYearTicks(dayRange);

      expect(actual).toEqual(expected);
    });

    it('should convert 2 month spanning day range to month-year ticks', () => {
      const expected = [
        {
          value: 0,
          label: 'JAN / 2018',
          daysLeftInMonth: 1,
        },
        {
          value: 1 / 2,
          label: 'FEB',
          daysLeftInMonth: 28,
        },
      ];
      const actual = convertDaysToMonthYearTicks(dayRange2Month);

      expect(actual).toEqual(expected);
    });
  });

  describe('sortValuesByDate', () => {
    it('should sort the measurements into an object by date', () => {
      const expected = {
        'Feb 05 2018': [230, 300],
        'Feb 06 2018': [479],
      };
      const actual = sortValuesByDate(glucoseMeasurements);

      expect(actual).toEqual(expected);
    });
  });

  describe('calculateDailyStats', () => {
    it('should calculate daily statistics for measurements', () => {
      const expected = {
        'Feb 05 2018': {
          count: 2,
          max: 300,
          mean: 265,
          min: 230,
          stdDev: 49.49747468305833,
        },
        'Feb 06 2018': {
          count: 1,
          max: 479,
          mean: 479,
          min: 479,
          stdDev: EMPTY_VALUE_PLACEHOLDER,
        },
      };
      const actual = calculateDailyStats({
        'Feb 05 2018': [230, 300],
        'Feb 06 2018': [479],
      });

      expect(actual).toEqual(expected);
    });
  });
});
