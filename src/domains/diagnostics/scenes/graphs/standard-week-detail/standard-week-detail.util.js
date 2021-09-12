import { map, mapObjIndexed, mean, pipe, pluck, values, isEmpty } from 'ramda';

import { convertDateToWeeklyFloat } from 'src/domains/diagnostics/utils';

export const dayIntervals = [
  { startTime: 0, endTime: 1, midTime: 0.5 },
  { startTime: 1, endTime: 2, midTime: 1.5 },
  { startTime: 2, endTime: 3, midTime: 2.5 },
  { startTime: 3, endTime: 4, midTime: 3.5 },
  { startTime: 4, endTime: 5, midTime: 4.5 },
  { startTime: 5, endTime: 6, midTime: 5.5 },
  { startTime: 6, endTime: 7, midTime: 6.5 },
];

export const appendDateAsFloatToMeasurement = measurement => ({
  ...measurement,
  weeklyFloat: convertDateToWeeklyFloat(measurement.date),
});

export const groupMeasurementsByInterval = intervals => measurements =>
  measurements.reduce((measurementsGroupedByInterval, measurement) => {
    const intervalKey = intervals
      .find(
        interval =>
          interval.startTime <= measurement.weeklyFloat &&
          interval.endTime > measurement.weeklyFloat,
      )
      .midTime.toString();

    const entries = measurementsGroupedByInterval[intervalKey] || [];

    return {
      ...measurementsGroupedByInterval,
      [intervalKey]: [...entries, measurement],
    };
  }, {});

export const calculateMeanValue = pipe(
  pluck('value'),
  mean,
);

export const calculateMeanAndFormMeanBgObjects = (measurements, interval) => {
  const meanValue = calculateMeanValue(measurements);

  return {
    data: { value: parseFloat(meanValue.toFixed(2)) },
    x: parseFloat(interval),
    y: meanValue,
  };
};

export const connectFirstAndLastBG = (bgPoints = []) => {
  if (isEmpty(bgPoints)) return;

  const sortedBgPoints = bgPoints.sort((a, b) => a.x - b.x);
  const first = sortedBgPoints[0];
  const last = sortedBgPoints[sortedBgPoints.length - 1];
  const startingPoint = { ...last, x: last.x - 7 };
  const endingPoint = { ...first, x: first.x + 7 };

  return [startingPoint, ...bgPoints, endingPoint];
};

export const createMeanBgPoints = pipe(
  map(appendDateAsFloatToMeasurement),
  groupMeasurementsByInterval(dayIntervals),
  mapObjIndexed(calculateMeanAndFormMeanBgObjects),
  values,
  connectFirstAndLastBG,
);
