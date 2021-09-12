import { pathOr, times, map, pipe } from 'ramda';

import {
  convertFormat,
  diffDays,
  addDays,
  daysInMonth,
  toDayOfMonthFormat,
  toAbbreviatedMonthFormat,
  toYearFormat,
  isWednesday,
  isThursday,
  isWeekend,
  average,
  fixToDecimalPlace,
  toGMTZone,
  getFormattedStandardDeviation,
} from 'src/domains/diagnostics/utils';
import { translateDate } from 'src/utils';

const DAY_OFFSET_DIVISOR = 20;
export const fromDateString = convertFormat('MMM dd yyyy', {
  zone: 'Etc/GMT+0',
});

export const calculateDifferenceInDays = (startDate, endDate) => {
  const difference = diffDays(endDate, startDate).toObject();
  const days = Math.ceil(pathOr(0, ['days'], difference));
  return days === -0 ? 0 : days;
};
const getDayOffset = ticks => Math.floor(ticks.length / DAY_OFFSET_DIVISOR);

const shouldDrawLongTick = (date, ticksCount, threshold) =>
  ticksCount > threshold && (date.isWednesday || date.isThursday);

export const generateDayRange = (startDate, endDate) => {
  const startDateTime = startDate.startOf('day');
  const endDateTime = endDate.endOf('day');
  const difference = calculateDifferenceInDays(startDateTime, endDateTime);

  return times(index => {
    const newDay = toGMTZone(addDays(index)(startDateTime));

    return {
      day: toDayOfMonthFormat(newDay),
      month: toAbbreviatedMonthFormat(newDay).toUpperCase(),
      daysInMonth: daysInMonth(newDay),
      year: toYearFormat(newDay),
      isWeekend: isWeekend(newDay),
      isWednesday: isWednesday(newDay),
      isThursday: isThursday(newDay),
    };
  }, difference);
};

export const convertDaysToDayTicks = (days, threshold = 60) =>
  days.map((day, index) => ({
    value: index / days.length,
    label: days.length > threshold && !day.isWednesday ? null : day.day,
    isWeekend: day.isWeekend,
    drawLongTick: shouldDrawLongTick(day, days.length, threshold),
  }));

export const convertDaysToMonthYearTicks = days => {
  const dayOffset = getDayOffset(days);

  let month;
  let year;

  return days
    .map((day, index) => {
      const value = index / days.length;
      const dayNumber = parseInt(day.day, 10);
      const monthLabel = month === day.month ? null : day.month;
      const yearLabel = year === day.year ? null : day.year;
      const daysLeftInMonth =
        month === day.month ? null : day.daysInMonth - dayNumber + 1;

      let label;

      if (monthLabel && dayNumber <= day.daysInMonth - dayOffset) {
        month = day.month;
        year = day.year;

        label = yearLabel
          ? `${translateDate(monthLabel).toUpperCase()} / ${translateDate(
              yearLabel,
            )}`
          : translateDate(monthLabel).toUpperCase();
      }

      return {
        value,
        label,
        daysLeftInMonth,
      };
    })
    .filter(tick => tick.daysLeftInMonth);
};

export const sortValuesByDate = measurements =>
  measurements.reduce((acc, measurement) => {
    const key = measurement.date.startOf('day').toFormat('MMM dd yyyy');

    const dateValues = acc[key]
      ? [...acc[key], measurement.value]
      : [measurement.value];
    return {
      ...acc,
      [key]: dateValues,
    };
  }, {});

export const calculateDailyStats = valuesByDay =>
  map(
    values => ({
      mean: fixToDecimalPlace(average(values), 1),
      stdDev: getFormattedStandardDeviation(values),
      max: Math.max(...values),
      min: Math.min(...values),
      count: values.length,
    }),
    valuesByDay,
  );

export const sortAndCalculateDailyStats = measurements =>
  pipe(
    sortValuesByDate,
    calculateDailyStats,
  )(measurements);
