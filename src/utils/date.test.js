import { path as mockPath, pipe } from 'ramda';
import { DateTime, Settings } from 'luxon';

import { locales as mockLocales } from 'src/i18n/locales';

import {
  convertMillis,
  convertUTC,
  setTimezone,
  toString,
  formatDateString,
  convertHTTP,
  convertISO,
  convertJSDate,
  convertJSDateGMT,
  getZone,
  getZoneName,
  getOffset,
  getOffsetNameLong,
  getOffsetNameShort,
  isOffsetFixed,
  isInDST,
  isAfter,
  isBefore,
  isSameOrBefore,
  isSameOrAfter,
  isEqual,
  isBetween,
  hasSame,
  daysInMonth,
  daysInYear,
  daysToHours,
  minutesToHours,
  toFormat,
  toLocaleString,
  isDateStringValid,
  isDateStringBetweenTwoDates,
  diffDays,
  toDayOfMonthFormat,
  toAbbreviatedMonthFormat,
  toYearFormat,
  toDayOfWeekNumFormat,
  isWednesday,
  isThursday,
  isWeekend,
  subQuarters,
  subMonths,
  subWeeks,
  plusQuarters,
  plusMonths,
  plusWeeks,
  compareAsc,
  toStartOfDay,
  toEndOfDay,
  toStartOfQuarter,
  toEndOfQuarter,
  toStartOfISOWeek,
  toEndOfISOWeek,
  toStartOfMonth,
  toEndOfMonth,
  translateDate,
} from './date';

jest.mock(
  'src/i18n',
  // Note: Arrow functions won't work
  // Note that the mock can't be an arrow function because calling new on an arrow function
  // is not allowed in JavaScript.
  function() {
    return {
      translate: translationPath =>
        mockPath(
          ['es', 'translations'].concat(translationPath.split('.')),
          mockLocales,
        ),
    };
  },
);

describe('Date testing utilities', () => {
  beforeAll(() => {
    Settings.defaultZoneName = 'Etc/GMT-5';
  });
  describe('Timezone conversion functions', () => {
    const dateInMillis = 1517921213601;

    it('should be Tuesday Feb 6 at 7.46', () => {
      expect(toString(convertMillis(dateInMillis))).toEqual(
        '2018-02-06T07:46:53.601-05:00',
      );
    });

    it('should transform milliseconds to a date and set timezone GMT+1', () => {
      const result = pipe(
        convertMillis,
        setTimezone('Etc/GMT+1'),
        toString,
      )(dateInMillis);
      expect(result).toEqual('2018-02-06T13:46:53.601+01:00');
    });
  });

  describe('HTTP date conversions', () => {
    let httpDate;
    beforeEach(() => {
      httpDate = 'Wed, 07 Nov 2018 08:49:37 GMT';
    });

    it('should convert an http date format to a luxon date', () => {
      expect(toString(convertHTTP(httpDate))).toEqual(
        '2018-11-07T03:49:37.000-05:00',
      );
    });
  });

  describe('Millisecond date conversions', () => {
    let milliseconds;
    beforeEach(() => {
      milliseconds = 1541580577000;
    });

    it('should convert an milliseconds to a luxon date', () => {
      expect(toString(convertMillis(milliseconds))).toEqual(
        '2018-11-07T03:49:37.000-05:00',
      );
    });
  });

  describe('ISO date conversions', () => {
    let iso;
    beforeEach(() => {
      iso = '2018-11-07T08:49:37.000Z';
    });

    it('should convert an iso date format to a luxon date object', () => {
      expect(toString(convertISO(iso))).toEqual(
        '2018-11-07T03:49:37.000-05:00',
      );
    });
  });

  describe('Javascript date conversions', () => {
    let jsDate;
    beforeEach(() => {
      jsDate = new Date('2018-11-07T08:49:37.000Z');
    });

    it('should convert an js date format to a luxon date object', () => {
      expect(toString(convertJSDate(jsDate))).toEqual(
        '2018-11-07T03:49:37.000-05:00',
      );
    });
  });

  describe('UTC conversions (months are 1-based instead of 0)', () => {
    const utcDate = [2018, 1, 6, 7, 46, 53];

    it('should be Tuesday Feb 6 at 7.46 GMT', () => {
      expect(
        pipe(
          convertUTC,
          toString,
        )(utcDate),
      ).toEqual('2018-02-06T07:46:53.000Z');
    });

    it('should be Tuesday Feb 6 at 7.46 GMT+1', () => {
      const result = pipe(
        convertUTC,
        setTimezone('Etc/GMT+1'),
        toString,
      )(utcDate);
      expect(result).toEqual('2018-02-06T08:46:53.000+01:00');
    });
  });

  describe('Format methods', () => {
    const date = convertJSDate(new Date('2018-11-07T03:49:37.000-05:00'), {
      zone: 'Etc/GMT-5',
    });

    it('should parse dates to local string dates accordingly', () => {
      expect(toString(toLocaleString(DateTime.DATE_FULL)(date))).toBe(
        'November 7, 2018',
      );
      expect(toString(toLocaleString(DateTime.DATE_SHORT)(date))).toBe(
        '11/7/2018',
      );
      expect(toString(toLocaleString(DateTime.DATE_HUGE)(date))).toBe(
        'Wednesday, November 7, 2018',
      );
      expect(toString(toLocaleString(DateTime.DATETIME_SHORT)(date))).toBe(
        '11/7/2018, 3:49 AM',
      );
    });
    it('should format dates accordingly', () => {
      expect(toString(toFormat('f')(date))).toBe('11/7/2018, 3:49 AM');
      expect(toString(toFormat('yyyy dd MM')(date))).toBe('2018 07 11');
      expect(toString(toFormat('yyyy d MM')(date))).toBe('2018 7 11');
      expect(toString(toFormat('yyyy/d/MM')(date))).toBe('2018/7/11');
      expect(toString(toFormat('DD MM')(date))).toBe('Nov 7, 2018 11');
      expect(toString(toFormat('DDD MM')(date))).toBe('November 7, 2018 11');
      expect(toString(toFormat('DDDD MM')(date))).toBe(
        'Wednesday, November 7, 2018 11',
      );
    });
  });

  describe('translateDate(): should return translated date time string', () => {
    it('should return translated date format MMM', () => {
      expect(translateDate('jan')).toBe('Ene');
    });

    it('should return translated date format MMM d, YYYY', () => {
      expect(translateDate('jan 2, 2018')).toBe('Ene 2, 2018');
    });

    it('should return translated date format cccc, MMM d, YYYY', () => {
      expect(translateDate('Monday, jan 2, 2018')).toBe('Lunes, Ene 2, 2018');
    });
  });

  describe('Getter methods', () => {
    let date;
    beforeEach(() => {
      date = convertJSDate(new Date('Wed, Feb 07 2018 11:27:47'), {
        zone: 'Etc/GMT+5',
      });
    });

    it('should get zone information', () => {
      expect(getZone(date)).toEqual({ fixed: 300 });
      expect(getZoneName(date)).toEqual('UTC+5');
    });

    it('should get offset information', () => {
      expect(getOffset(date)).toEqual(300);
      expect(getOffsetNameShort(date)).toEqual('UTC+5');
      expect(getOffsetNameLong(date)).toEqual('UTC+5');
      expect(isOffsetFixed(date)).toEqual(true);
    });
    it('should get dst information', () => {
      expect(isInDST(date)).toEqual(false);
    });
  });

  describe('Date comparison/math methods', () => {
    let date1, date2, date3;
    beforeEach(() => {
      date1 = convertJSDate(new Date('Wed, Feb 07 2018 12:27:47'));
      date2 = convertJSDate(new Date('Wed, Feb 07 2018 11:27:47'));
      date3 = convertJSDate(new Date('Wed, Feb 07 2018 14:27:47'));
    });

    it('should be that date 1 is after date 2', () => {
      expect(isAfter(date1, date2)).toBe(true);
      expect(isAfter(date1, date2)).toBe(true);
      expect(isSameOrAfter(date2, date1)).toBe(false);
    });

    it('should be that date 2 is before date 1', () => {
      expect(isBefore(date2, date1)).toBe(true);
      expect(isBefore(date1, date2)).toBe(false);
      expect(isSameOrBefore(date2, date1)).toBe(true);
    });

    it('should be that date 2 and date 1 happened on the same day, month and year', () => {
      expect(hasSame('day', date2, date1)).toBe(true);
      expect(hasSame('month', date2, date1)).toBe(true);
      expect(hasSame('year', date2, date1)).toBe(true);
    });

    it('should be that date 2 and date 1 are not equal', () => {
      expect(isEqual(date2, date1)).toBe(false);
    });

    it('should be that date 1 is between date 2 and date 3', () => {
      expect(isBetween(date1, date2, date3)).toBe(true);
    });

    it('should be that date 1 has 28 days in a month', () => {
      expect(daysInMonth(date1)).toBe(28);
    });

    it('should be that date 1 has 365 days in a month', () => {
      expect(daysInYear(date1)).toBe(365);
    });

    it('should be that 3 days is 72 hours', () => {
      expect(daysToHours(3)).toBe(72);
    });

    it('should be that 720 minutes is 12 hours', () => {
      expect(minutesToHours(720)).toBe(12);
    });

    it('should be that the difference in days is 1/24 days', () => {
      expect(diffDays(date1, date2).toObject()).toEqual({ days: 1 / 24 });
    });
  });

  describe('Formatting methods', () => {
    let date;
    beforeEach(() => {
      date = convertJSDateGMT(new Date('Wed, Feb 07 2018 12:27:47 GMT+0000'));
    });

    it('should be that the day of the month is 7', () => {
      expect(toDayOfMonthFormat(date)).toBe('7');
    });

    it('should be that the abbreviated month is Feb', () => {
      expect(toAbbreviatedMonthFormat(date)).toBe('Feb');
    });

    it('should be that the year is 2018', () => {
      expect(toYearFormat(date)).toBe('2018');
    });

    it('should be that the day of the week number is 3', () => {
      expect(toDayOfWeekNumFormat(date)).toBe('3');
    });

    it('should return the start of the day', () => {
      const expected = convertJSDateGMT(
        new Date('Feb 7 2018 00:00:00 GMT+0000'),
      );
      const actual = toStartOfDay(date);
      expect(actual).toEqual(expected);
    });

    it('should return the end of the day', () => {
      const expected = convertJSDateGMT(
        new Date('Feb 7 2018 23:59:59.999 GMT+0000'),
      );
      const actual = toEndOfDay(date);
      expect(actual).toEqual(expected);
    });

    it('should return the start of the week', () => {
      const expected = convertJSDateGMT(
        new Date('Feb 5 2018 00:00:00 GMT+0000'),
      );
      const actual = toStartOfISOWeek(date);
      expect(actual).toEqual(expected);
    });

    it('should return the end of the week', () => {
      const expected = convertJSDateGMT(
        new Date('Feb 11 2018 23:59:59.999 GMT+0000'),
      );
      const actual = toEndOfISOWeek(date);
      expect(actual).toEqual(expected);
    });

    it('should return the start of the month', () => {
      const expected = convertJSDateGMT(
        new Date('Feb 1 2018 00:00:00 GMT+0000'),
      );
      const actual = toStartOfMonth(date);
      expect(actual).toEqual(expected);
    });

    it('should return the end of the month', () => {
      const expected = convertJSDateGMT(
        new Date('Feb 28 2018 23:59:59.999 GMT+0000'),
      );
      const actual = toEndOfMonth(date);
      expect(actual).toEqual(expected);
    });

    it('should return the start of the quarter', () => {
      const expected = convertJSDateGMT(
        new Date('Jan 1 2018 00:00:00 GMT+0000'),
      );
      const actual = toStartOfQuarter(date);
      expect(actual).toEqual(expected);
    });

    it('should return the end of the quarter', () => {
      const expected = convertJSDateGMT(
        new Date('Mar 31 2018 23:59:59.999 GMT+0000'),
      );
      const actual = toEndOfQuarter(date);
      expect(actual).toEqual(expected);
    });
  });

  describe('Day of the week methods', () => {
    let date1, date2, date3;

    beforeEach(() => {
      date1 = convertJSDateGMT(new Date('Wed, Feb 07 2018 12:27:47 GMT+0000'));
      date2 = convertJSDateGMT(new Date('Thu, Feb 08 2018 12:27:47 GMT+0000'));
      date3 = convertJSDateGMT(new Date('Sat, Feb 10 2018 12:27:47 GMT+0000'));
    });

    it('should be that only date 1 is a Wednesday', () => {
      expect(isWednesday(date1)).toBe(true);
      expect(isWednesday(date2)).toBe(false);
      expect(isWednesday(date3)).toBe(false);
    });

    it('should be that only date 2 is a Thursday', () => {
      expect(isThursday(date1)).toBe(false);
      expect(isThursday(date2)).toBe(true);
      expect(isThursday(date3)).toBe(false);
    });

    it('should be that only date 3 is a Weekend', () => {
      expect(isWeekend(date1)).toBe(false);
      expect(isWeekend(date2)).toBe(false);
      expect(isWeekend(date3)).toBe(true);
    });
  });

  describe('other test suite', () => {
    test('Formats date in English', () => {
      const dateString = 'Fri Nov 17 2017 00:00:00 GMT-0500 (EST)';
      expect(formatDateString({ dateString })).toBe('17 November 2017');
    });

    test('Formats invalid date', () => {
      const dateString = '';
      const errorString = 'Date not found';
      expect(formatDateString({ dateString, errorString })).toBe(errorString);
    });

    test('Formats date en Español', () => {
      const dateString = 'Fri Nov 17 2017 00:00:00 GMT-0500 (EST)';
      const locale = 'es';
      // GMT -5 default
      expect(
        formatDateString({
          dateString,
          locale,
        }),
      ).toBe('17 noviembre 2017');
    });

    test('Validates valid date', () => {
      const dateString = 'Fri Nov 17 2017 00:00:00 GMT-0500 (EST)';
      expect(isDateStringValid(dateString)).toBe(true);
    });

    test('Validates invalid date', () => {
      const dateString = 'Fri Nov 37 2017 00:00:00 GMT-0500 (EST)';
      expect(isDateStringValid(dateString)).toBe(false);
    });

    test('Validates date string is between two dates', () => {
      const dateString = 'Fri Nov 17 2017 12:00:00 GMT-0500 (EST)';
      const startDateString = 'Fri Nov 16 2017 02:00:00 GMT-0500 (EST)';
      const endDateString = 'Fri Nov 18 2017 02:00:00 GMT-0500 (EST)';

      expect(
        isDateStringBetweenTwoDates(dateString, startDateString, endDateString),
      ).toBe(true);
    });

    describe('Overview date math functions', () => {
      let date;
      beforeEach(() => {
        date = convertJSDateGMT(new Date('Dec 1 2017 12:00:00 GMT+0000'));
      });

      test('should subtract a quarter from date', () => {
        const expected = convertJSDateGMT(
          new Date('Sep 1 2017 12:00:00 GMT+0000'),
        );
        const actual = subQuarters(date, 1);
        expect(actual).toEqual(expected);
      });

      test('should subtract a month from the date', () => {
        const expected = convertJSDateGMT(
          new Date('Nov 1 2017 12:00:00 GMT+0000'),
        );
        const actual = subMonths(date, 1);
        expect(actual).toEqual(expected);
      });

      test('should subtract a week from the date', () => {
        const expected = convertJSDateGMT(
          new Date('Nov 24 2017 12:00:00 GMT+0000'),
        );
        const actual = subWeeks(date, 1);
        expect(actual).toEqual(expected);
      });

      test('should add a quarter from date', () => {
        const expected = convertJSDateGMT(
          new Date('March 1 2018 12:00:00 GMT+0000'),
        );
        const actual = plusQuarters(date, 1);
        expect(actual).toEqual(expected);
      });

      test('should add a month from the date', () => {
        const expected = convertJSDateGMT(
          new Date('Jan 1 2018 12:00:00 GMT+0000'),
        );
        const actual = plusMonths(date, 1);
        expect(actual).toEqual(expected);
      });

      test('should add a week from the date', () => {
        const expected = convertJSDateGMT(
          new Date('Dec 8 2017 12:00:00 GMT+0000'),
        );
        const actual = plusWeeks(date, 1);
        expect(actual).toEqual(expected);
      });
    });

    describe('compareAsc', () => {
      let date1;
      let date2;

      beforeEach(() => {
        date1 = convertJSDateGMT(new Date('Dec 1 2017 12:00:00 GMT+0000'));
        date2 = convertJSDateGMT(new Date('Dec 2 2017 12:00:00 GMT+0000'));
      });

      test('should return -1 if date1 is before date2', () => {
        const expected = -1;
        const actual = compareAsc(date1, date2);
        expect(actual).toEqual(expected);
      });

      test('should return 1 if date2 is after date1', () => {
        const expected = 1;
        const actual = compareAsc(date2, date1);
        expect(actual).toEqual(expected);
      });

      test('should return 0 if the dates are the same', () => {
        const expected = 0;
        const actual = compareAsc(date1, date1);
        expect(actual).toEqual(expected);
      });
    });
  });
});
