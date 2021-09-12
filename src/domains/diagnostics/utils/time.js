import { isNil } from 'ramda';

import { toFormat } from './date';

export const timeStringToFloat = (time, numberOfDecimalPlaces) => {
  const hoursMinutes = time.split(/[.:]/);
  const hours = parseInt(hoursMinutes[0], 10);
  const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) / 60 : 0;

  if (isNil(numberOfDecimalPlaces)) {
    return (hours + minutes) / 24;
  }

  return parseFloat(((hours + minutes) / 24).toFixed(numberOfDecimalPlaces));
};

export const convertDateToWeeklyFloat = date => {
  const day = date.weekday - 1;
  const time = toFormat('HH:mm:ss')(date);
  const percentageOfDayElapsed = timeStringToFloat(time, 3);
  const dateTimeAsNumber = day + percentageOfDayElapsed;

  return dateTimeAsNumber;
};

export const isTimeWithinLinearInterval = (targetTime, startTime, endTime) =>
  targetTime >= startTime && targetTime < endTime;

export const isTimeWithinInterval = (targetTime, startTime, endTime) => {
  const doesIntervalCrossMidnight = endTime < startTime;
  const endOfDay = '23:59:59';
  const midnight = '00:00:00';

  return doesIntervalCrossMidnight
    ? isTimeWithinLinearInterval(targetTime, startTime, endOfDay) ||
        isTimeWithinLinearInterval(targetTime, midnight, endTime)
    : isTimeWithinLinearInterval(targetTime, startTime, endTime);
};

export const isDatetimeWithinInterval = (
  targetDateTime,
  startTime,
  endTime,
) => {
  const targetTime = toFormat('HH:mm:ss')(targetDateTime);
  return isTimeWithinInterval(targetTime, startTime, endTime);
};
