/**
 * https://moment.github.io/luxon/docs/manual/matrix.html
 +--------------+--------------------+-------------------------------------------------------------------+
 |     Type     |      Example       |                            Description                            |
 +--------------+--------------------+-------------------------------------------------------------------+
 | IANA         | 'America/New_York' | that zone                                                         |
 | local        | 'local'            | the system's local zone                                           |
 | UTC          | 'utc'              | Universal Coordinated Time                                        |
 | fixed offset | 'UTC+7'            | a fixed offset zone                                               |
 | Zone         | new YourZone()     | A custom implementation of Luxon's Zone interface (advanced only) |
 +--------------+--------------------+-------------------------------------------------------------------+
 */
import { pipe, ifElse, isNil, always, identity } from 'ramda';
import { DateTime, Duration, Settings } from 'luxon';

import { translate } from 'src/i18n';

// Create all new dates using EN locale for optimal processing speed
// In non-EN browsers, Luxon reroutes calculations through the native internationalization API
// Please do not edit until a full I18n solution has been found
Settings.defaultLocale = 'en';

// Conversion
/**
 * Luxon is 1-based month system, meaning January is 1 instead of 0 like normal date objects
 * https://moment.github.io/luxon/docs/manual/moment.html
 * */
export const convertUTC = utc => addMonths(1)(DateTime.utc(...utc));
export const convertHTTP = (httpDateString, opts) =>
  DateTime.fromHTTP(httpDateString, opts);
export const convertISO = (isoDateString, opts) =>
  DateTime.fromISO(isoDateString, opts);
export const convertFormat = (format, opts) => dateString =>
  DateTime.fromFormat(dateString, format, opts);
export const convertJSDate = (jsDate, opts) =>
  DateTime.fromJSDate(jsDate, opts);
export const convertMillis = (millis, opts) =>
  DateTime.fromMillis(millis, opts);
export const convertStringToJSDate = dateString =>
  dateString === null ? null : new Date(dateString);
export const convertJSDateGMT = (jsDate, opts) =>
  DateTime.fromJSDate(jsDate, { ...opts, zone: 'Etc/GMT+0' });
export const convertISOGMT = (isoDateString: string, opts: {}) =>
  convertJSDateGMT(convertStringToJSDate(isoDateString), opts);
export const convertISOToJsGMT = convertISOGMT;

// Getters
export const getZone = date => date.zone;
export const getZoneName = date => date.zoneName;
export const getOffset = date => date.offset;
export const getOffsetNameShort = date => date.offsetNameShort;
export const getOffsetNameLong = date => date.offsetNameLong;
export const isOffsetFixed = date => date.isOffsetFixed;
export const isInDST = date => date.isInDST;

// Output
export const now = () => DateTime.local();
export const toString = date => date.toString();
export const toLocaleString = format => date => date.toLocaleString(format);
export const toJSDate = date => date.toJSDate();
export const epochTime = date => date.valueOf();
export const toFormat = format => date => date.toFormat(format);
export const toFormatWithLocale = format => date =>
  pipe(
    toFormat(format),
    translateDate,
  )(date);
export const translateDate = dateString => {
  const words = dateString.match(/([a-zA-Z]+)/g) || [];

  return words.reduce((result, word) => {
    const translatedWord = translate('general.date.' + word.toLowerCase());
    return translatedWord ? result.replace(word, translatedWord) : result;
  }, dateString);
};
export const toISO = date => date.toISO();

// Locale
export const getLocalTimeZone = date =>
  pipe(
    now,
    getZoneName,
  )(date);
export const setLocale = locale => date => date.setLocale(locale);

// Timezone
export const setTimezone = (
  iana,
  options = { keepLocalTime: false },
) => dateTime => dateTime.setZone(iana, options);

export const toGMTZone = date => date.setZone('Etc/GMT+0');

/**
 * Utilities
 */

// Compare
export const isBefore = (d1, d2) => d1 < d2;
export const isAfter = (d1, d2) => d1 > d2;
export const isSameOrBefore = (d1, d2) => d1 <= d2;
export const isSameOrAfter = (d1, d2) => d1 >= d2;
export const isEqual = (d1, d2) => d1.hasSame(d2, 'millisecond');
export const isBetween = (date, startDate, endDate) =>
  isSameOrBefore(startDate, date) && isSameOrAfter(endDate, date);
export const hasSame = (comparator, d1, d2) => d1.hasSame(d2, comparator);
export const daysInMonth = date => date.daysInMonth;
export const daysInYear = date => date.daysInYear;

// Duration
export const daysToHours = days => Duration.fromObject({ days }).as('hours');
export const minutesToHours = minutes =>
  Duration.fromObject({ minutes }).as('hours');

// Math
export const subtractMinutes = minutes => date =>
  date.plus({ minutes: -minutes });
export const subtractQuarters = quarters => date =>
  date.plus({ months: -3 * quarters });
export const subtractHours = hours => date => date.plus({ hours: -hours });
export const subtractDays = days => date => date.plus({ days: -days });
export const subtractWeeks = weeks => date => date.plus({ weeks: -weeks });
export const subtractMonths = months => date => date.plus({ months: -months });
export const addQuarters = quarters => date =>
  date.plus({ months: 3 * quarters });
export const addMonths = months => date => date.plus({ months });
export const addWeeks = weeks => date => date.plus({ weeks });
export const addDays = days => date => date.plus({ days });
export const addHours = hours => date => date.plus({ hours });
export const addMinutes = minutes => date => date.plus({ minutes });
export const diffDays = (d1, d2) => d1.diff(d2, 'days');
export const diffHours = (d1, d2) => d1.diff(d2, 'hours');

// Formatting
export const toDayOfMonthFormat = date => toFormat('d')(date);
export const toAbbreviatedMonthFormat = date => toFormat('LLL')(date);
export const toYearFormat = date => toFormat('yyyy')(date);
export const toDayOfWeekNumFormat = date => toFormat('c')(date);
export const toDayOfYearFormat = date => toFormat('o')(date);
export const toStartOfDay = date => date.startOf('day');
export const toEndOfDay = date => date.endOf('day');
export const toStartOfQuarter = date => {
  const quarter = date.quarter;
  return date
    .set({
      month: 3 * quarter - 2,
    })
    .startOf('month');
};
export const toEndOfQuarter = date => {
  const quarter = date.quarter;
  return date
    .set({
      month: 3 * quarter,
    })
    .endOf('month');
};
export const toStartOfMonth = date => date.startOf('month');
export const toEndOfMonth = date => date.endOf('month');
export const toStartOfISOWeek = date => date.startOf('week');
export const toEndOfISOWeek = date => date.endOf('week');

// Day of the Week
export const isWednesday = date => toDayOfWeekNumFormat(date) === '3';
export const isThursday = date => toDayOfWeekNumFormat(date) === '4';
export const toDayOfWeekNum = date => parseInt(toDayOfWeekNumFormat(date), 10);
export const isWeekend = date => toDayOfWeekNum(date) > 5;

/**
 * Stuff
 */

export const jsDateToISOString = date => date.toISOString();

export const isDateValid = date => date.isValid;

export const isDateStringValid = ifElse(
  isNil,
  always(false),
  pipe(
    convertStringToJSDate,
    convertJSDate,
    isDateValid,
  ),
);

export const isDateStringBetweenTwoDates = (dateString, startDate, endDate) => {
  const startOfStartDate = pipe(
    convertStringToJSDate,
    convertJSDate,
    toGMTZone,
  )(startDate).startOf('day');
  const endOfEndDate = pipe(
    convertStringToJSDate,
    convertJSDate,
    toGMTZone,
  )(endDate).endOf('day');
  const date = pipe(
    convertStringToJSDate,
    convertJSDate,
  )(dateString);

  return isBetween(date, startOfStartDate, endOfEndDate);
};

export const isDateInDateRange = (date, startDate, endDate) =>
  isBetween(date, startDate.startOf('day'), endDate.endOf('day'));

export const formatDateString = ({
  dateString,
  errorString = '',
  locale = 'en',
  format = 'd LLLL yyyy',
  timeZone = undefined,
}) =>
  isDateStringValid(dateString)
    ? pipe(
        convertStringToJSDate,
        convertJSDateGMT,
        // was trying to find a more elegant way of being able to use R.ifElse or something
        // but it stumped me, so this for now.
        isNil(timeZone) ? identity : setTimezone(timeZone),
        setLocale(locale),
        toFormat(format),
      )(dateString)
    : errorString;

const hourArrayReducer = hourArray =>
  hourArray.reduce((total, number, index) => {
    switch (index) {
      case 0:
        return total + number;
      case 1:
        // prettier-ignore
        return total + (number / 60);
      case 2:
        // prettier-ignore
        return total + (number / 60 / 60);
      default:
        return total;
    }
  });

export const dateToFloat = date =>
  hourArrayReducer([date.getHours(), date.getMinutes(), date.getSeconds()]);

export const hourStringToFloat = hour =>
  hourArrayReducer(hour.split(':').map(n => parseInt(n, 10)));

export const convertGMTDateToFloat = date =>
  hourStringToFloat(toFormat('HH:mm:ss')(convertJSDateGMT(date)));

export const compareAsc = (date1, date2) => {
  if (isAfter(date1, date2)) {
    return 1;
  }
  if (isBefore(date1, date2)) {
    return -1;
  }
  return 0;
};

// Math for overview
export const subQuarters = (date, quarters) =>
  date.plus({ months: -3 * quarters });
export const subWeeks = (date, weeks) => date.plus({ weeks: -weeks });
export const subMonths = (date, months) => date.plus({ months: -months });
export const plusQuarters = (date, quarters) =>
  date.plus({ months: 3 * quarters });
export const plusWeeks = (date, weeks) => date.plus({ weeks: weeks });
export const plusMonths = (date, months) => date.plus({ months: months });
