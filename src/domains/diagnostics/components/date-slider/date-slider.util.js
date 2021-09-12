import {
  subMonths,
  addMonths,
  format,
  subDays,
  addDays,
  startOfMonth,
  isBefore,
  isAfter,
} from 'date-fns';
import { path } from 'ramda';

import { convertJSDateGMT } from 'src/domains/diagnostics/utils';

import { HANDLES } from './date-slider.constant';

export const getHandleDragPosition = (
  pathWidth,
  pathX,
  tickDistance,
  rangeStart,
) => {
  if (pathX < 0) {
    return rangeStart;
  } else if (pathX > pathWidth) {
    return Math.ceil(pathWidth / tickDistance) + rangeStart;
  } else {
    return Math.ceil(pathX / tickDistance) + rangeStart;
  }
};

export const getHandleState = (
  pathWidth,
  pathX,
  tickDistance,
  draggingHandle,
  startHandleValue,
  endHandleValue,
  rangeStart,
) => {
  let nextStartHandleValue =
    draggingHandle === HANDLES.START_HANDLE
      ? getHandleDragPosition(pathWidth, pathX, tickDistance, rangeStart)
      : startHandleValue;
  let nextEndHandleValue =
    draggingHandle === HANDLES.END_HANDLE
      ? getHandleDragPosition(pathWidth, pathX, tickDistance, rangeStart)
      : endHandleValue;

  if (nextStartHandleValue > nextEndHandleValue) {
    nextStartHandleValue = startHandleValue;
    nextEndHandleValue = endHandleValue;
  }

  return {
    startHandleValue: nextStartHandleValue,
    endHandleValue: nextEndHandleValue,
  };
};

export const getRangeValues = (
  firstMeasurementDate,
  lastMeasurementDate,
  startDate,
  endDate,
) => {
  if (!firstMeasurementDate || !startDate) {
    return {};
  }

  const axisEndingPoint = isAfter(endDate, lastMeasurementDate)
    ? endDate
    : lastMeasurementDate;

  const sevenMonthsBeforeLastMeasurement = subMonths(lastMeasurementDate, 7);

  const axisStartingPoint = isBefore(
    startDate,
    sevenMonthsBeforeLastMeasurement,
  )
    ? startDate
    : sevenMonthsBeforeLastMeasurement;

  const totalDayCount = getDayCount(firstMeasurementDate, axisEndingPoint) - 1;
  const initialTotalDayCount =
    getDayCount(firstMeasurementDate, lastMeasurementDate) - 1;
  const dayCountInRange = getDayCount(axisStartingPoint, axisEndingPoint);

  const rangeStart = totalDayCount - dayCountInRange;
  const startHandleValue = getDayCount(firstMeasurementDate, startDate);
  const endHandleValue = getDayCount(firstMeasurementDate, endDate) - 1;

  const startDiff = startHandleValue - rangeStart;
  const dayOffset = startDiff > 0 ? 0 : startDiff;

  return {
    initialRangeStart: rangeStart,
    initialRangeEnd: initialTotalDayCount,
    rangeEnd: totalDayCount + dayOffset,
    rangeStart: rangeStart + dayOffset,
    endHandleValue,
    startHandleValue,
    dayOffset,
  };
};

export const sliderValueToDate = (
  firstMeasurementDate,
  value,
  dateFormat = true,
) => {
  const newDateTime = convertJSDateGMT(new Date(firstMeasurementDate)).plus({
    days: value,
  });

  return dateFormat
    ? `${newDateTime.toFormat("dd'/'LL")}/${newDateTime.toFormat('yyyy')}`
    : newDateTime.toISO();
};

export const getDayCount = (startDate, endDate) => {
  const gmtStart = convertJSDateGMT(new Date(startDate));
  const gmtEnd = convertJSDateGMT(new Date(endDate));

  return Math.ceil(path(['values', 'days'], gmtEnd.diff(gmtStart, 'days')));
};

export const getMonthsWithinRange = (
  rangeStart,
  rangeEnd,
  firstMeasurementDate,
) => {
  const months = [];
  const startDate = addDays(firstMeasurementDate, rangeStart);
  const endDate = addDays(firstMeasurementDate, rangeEnd);
  let iterableDate = addMonths(startOfMonth(subDays(startDate, 1)), 1);

  while (endDate > iterableDate) {
    months.push({
      stringValue: format(iterableDate, 'MM / YYYY'),
      dateVaue: iterableDate,
      daysFromStart: getDayCount(startDate, iterableDate),
    });
    iterableDate = addMonths(iterableDate, 1);
  }
  return months;
};
