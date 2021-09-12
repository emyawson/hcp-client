import { values, compose, groupWith } from 'ramda';

import {
  toFormat,
  toStartOfQuarter,
  toEndOfQuarter,
  toStartOfISOWeek,
  toEndOfISOWeek,
  toStartOfMonth,
  toEndOfMonth,
  toStartOfDay,
  toEndOfDay,
  subWeeks,
  subMonths,
  subQuarters,
  isEqual,
  isAfter,
  isBefore,
  toDayOfWeekNumFormat,
  compareAsc,
  diffDays,
  isBetween,
  hasSame,
} from 'src/domains/diagnostics/utils';
import { TIME_INTERVAL } from 'src/domains/diagnostics/constants';

const WEEKLY_DIFF_DATE_FORMAT = 'W/yy';
const MONTHLY_DIFF_DATE_FORMAT = 'M/yy';
const QUARTERLY_DIFF_DATE_FORMAT = 'q/yy';

const makeToInterval = (
  intervalStartFormatter,
  intervalEndFormatter,
) => date => ({
  start: intervalStartFormatter(date),
  end: intervalEndFormatter(date),
});

const makeReducerForGroupByInterval = (
  groupDiffDateFormat,
  intervalStartFormatter,
  intervalEndFormatter,
) => (groups, objectWithDate) => {
  const { date } = objectWithDate;

  // start is not used for the interval object below intentionally
  const start = intervalStartFormatter(date);
  const groupKey = toFormat(groupDiffDateFormat)(start);

  if (groups[groupKey]) {
    groups[groupKey].group.push(objectWithDate);
  } else {
    groups[groupKey] = {
      interval: {
        start: intervalStartFormatter(date),
        end: intervalEndFormatter(date),
      },
      group: [objectWithDate],
    };
  }

  return groups;
};

const reduceToGroupByQuarter = makeReducerForGroupByInterval(
  QUARTERLY_DIFF_DATE_FORMAT,
  toStartOfQuarter,
  toEndOfQuarter,
);

const reduceToGroupByMonth = makeReducerForGroupByInterval(
  MONTHLY_DIFF_DATE_FORMAT,
  toStartOfMonth,
  toEndOfMonth,
);

const reduceToGroupByWeek = makeReducerForGroupByInterval(
  WEEKLY_DIFF_DATE_FORMAT,
  toStartOfISOWeek,
  toEndOfISOWeek,
);

const reduceToGroupByDay = makeReducerForGroupByInterval(
  'd/M/yy',
  toStartOfDay,
  toEndOfDay,
);

export const groupByDay = (objectsWithDates, fillerGroups = {}) =>
  values(objectsWithDates.reduce(reduceToGroupByDay, fillerGroups));

export const groupByWeek = (objectsWithDates, fillerGroups = {}) =>
  values(objectsWithDates.reduce(reduceToGroupByWeek, fillerGroups));

export const groupByMonth = (objectsWithDates, fillerGroups = {}) =>
  values(objectsWithDates.reduce(reduceToGroupByMonth, fillerGroups));

export const groupByQuarter = (objectsWithDates, fillerGroups = {}) =>
  values(objectsWithDates.reduce(reduceToGroupByQuarter, fillerGroups));

export const toWeeklyInterval = makeToInterval(
  toStartOfISOWeek,
  toEndOfISOWeek,
);
export const toMonthlyInterval = makeToInterval(toStartOfMonth, toEndOfMonth);
export const toQuarterlyInterval = makeToInterval(
  toStartOfQuarter,
  toEndOfQuarter,
);

const subIntervalTransformers = {
  [TIME_INTERVAL.QUARTERLY_INTERVALS]: compose(
    toQuarterlyInterval,
    subQuarters,
  ),
  [TIME_INTERVAL.MONTHLY_INTERVALS]: compose(
    toMonthlyInterval,
    subMonths,
  ),
  [TIME_INTERVAL.WEEKLY_INTERVALS]: compose(
    toWeeklyInterval,
    subWeeks,
  ),
};

export const subIntervals = (date, timeInterval, amount) =>
  subIntervalTransformers[timeInterval](date, amount);

export const toInterval = (date, timeInterval) =>
  subIntervals(date, timeInterval, 0);

const makeCompareInterval = comparer => (intervalA, intervalB) =>
  comparer(intervalA.start, intervalB.start) &&
  comparer(intervalA.end, intervalB.end);

export const isEqualInterval = makeCompareInterval(isEqual);
export const isBeforeInterval = makeCompareInterval(isBefore);
export const isAfterInterval = makeCompareInterval(isAfter);

const makeDescIntervals = (date, timeInterval, amount) => {
  const intervals = [];
  for (let i = 0; i < amount; i++) {
    intervals.push(subIntervalTransformers[timeInterval](date, i));
  }
  return intervals;
};

const makeEmptyIntervalGroups = (
  intervals,
  groupDiffDateFormat,
  firstMeasurementDate,
  lastMeasurementDate,
) => {
  const groups = {};

  intervals.forEach((interval, index, array) => {
    const groupKey = toFormat(groupDiffDateFormat)(interval.start);

    if (
      index === 0 &&
      isBetween(lastMeasurementDate, interval.start, interval.end)
    ) {
      interval.end = toEndOfDay(lastMeasurementDate);
    }

    if (
      index === array.length - 1 &&
      isBetween(firstMeasurementDate, interval.start, interval.end)
    ) {
      interval.start = toStartOfDay(firstMeasurementDate);
    }

    groups[groupKey] = {
      interval,
      group: [],
    };
  });
  return groups;
};

export const groupByWeekFilled = (
  objectsWithDates,
  endDate,
  amount,
  firstMeasurementDate,
  lastMeasurementDate,
) => {
  const intervals = makeDescIntervals(
    endDate,
    TIME_INTERVAL.WEEKLY_INTERVALS,
    amount,
  );
  const fillerGroups = makeEmptyIntervalGroups(
    intervals,
    WEEKLY_DIFF_DATE_FORMAT,
    firstMeasurementDate,
    lastMeasurementDate,
  );
  return groupByWeek(objectsWithDates, fillerGroups);
};

export const groupByMonthFilled = (objectsWithDates, endDate, amount) => {
  const intervals = makeDescIntervals(
    endDate,
    TIME_INTERVAL.MONTHLY_INTERVALS,
    amount,
  );
  const fillerGroups = makeEmptyIntervalGroups(
    intervals,
    MONTHLY_DIFF_DATE_FORMAT,
  );

  return groupByMonth(objectsWithDates, fillerGroups);
};

export const groupByQuarterFilled = (objectsWithDates, endDate, amount) => {
  const intervals = makeDescIntervals(
    endDate,
    TIME_INTERVAL.QUARTERLY_INTERVALS,
    amount,
  );
  const fillerGroups = makeEmptyIntervalGroups(
    intervals,
    QUARTERLY_DIFF_DATE_FORMAT,
  );
  return groupByQuarter(objectsWithDates, fillerGroups);
};

export const filterMeasurementsByDateRange = (
  startDate,
  endDate,
  measurements,
) =>
  measurements.filter(({ date }) => {
    const start = toStartOfDay(startDate);
    const end = toEndOfDay(endDate);
    return compareAsc(date, start) >= 0 && compareAsc(date, end) <= 0;
  });

export const isWeekendDay = date => toDayOfWeekNumFormat(date) > 5;

export const sortTwoMeasurementsByAscendingDate = (
  measurementA,
  measurementB,
) => {
  const dateA = measurementA.date;
  const dateB = measurementB.date;
  return compareAsc(dateA, dateB);
};

export const groupMeasurementsByDate = groupWith(
  (measurementA, measurementB) => measurementA.date === measurementB.date,
); //call groupMeasurementsByDate(measurements)

export const groupObjectsByGMTDate = groupWith((objectA, objectB) =>
  hasSame('day', objectA.date, objectB.date),
);

export const diffInDaysInclusiveOfEnds = (startDate, endDate) => {
  const start = startDate.startOf('day');
  const end = endDate.endOf('day');
  const difference = diffDays(end, start).toObject();
  return Math.ceil(difference.days);
};
