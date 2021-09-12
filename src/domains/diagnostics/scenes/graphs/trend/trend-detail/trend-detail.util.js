import { groupWith, keys, sort, append } from 'ramda';

import { colors } from 'src/domains/diagnostics/styles';
import {
  toGMTZone,
  toEndOfDay,
  toStartOfDay,
  toFormat,
} from 'src/domains/diagnostics/utils';
import { GRAPH_Y_MAX } from 'src/domains/diagnostics/scenes/graphs/trend/trend-trend/trend-trend.constants';
import { getYFromTwoPointsAndOneXValue } from 'src/domains/diagnostics/scenes/graphs/graph.util';

import {
  calculateDifferenceInDays,
  fromDateString,
  sortAndCalculateDailyStats,
} from '../trend.util';

const HOURS_IN_MS = 3600000;

export const calculateFullRange = (startDate, endDate) => {
  const start = startDate.startOf('day');
  const end = endDate.endOf('day');
  return end - start;
};

export const convertMeasurementsToPoints = (
  measurements,
  totalTime,
  startDate,
  thresholds,
  graphYMax = GRAPH_Y_MAX,
) =>
  measurements.map(measurement => {
    let shape = 'x';

    if (measurement.value > graphYMax) {
      shape = 'triangle';
    } else if (
      !(shape === 'triangle') &&
      (measurement.beforeMeal || measurement.afterMeal)
    ) {
      shape = 'square';
    }

    const start = startDate.startOf('day');
    const x = (measurement.date - start) / totalTime;
    const y = shape === 'triangle' ? 1 : measurement.value / graphYMax;
    let strokeColor = colors.black;

    if (measurement.value > thresholds.glucoseIdealIntervalMax) {
      strokeColor = colors.blueLight;
    } else if (measurement.value < thresholds.hypoglycemiaThreshold) {
      strokeColor = colors.red;
    }

    const fillColor =
      measurement.afterMeal || shape === 'triangle'
        ? strokeColor
        : colors.white;

    return {
      shape,
      x,
      y,
      strokeColor,
      fillColor,
      data: measurement,
    };
  });

export const normalizeMeans = (
  measurements,
  startDate,
  endDate,
  graphYMax = GRAPH_Y_MAX,
) => {
  const start = startDate.startOf('day');
  const end = endDate.endOf('day');
  const range = calculateDifferenceInDays(start, end);

  const statsByDay = sortAndCalculateDailyStats(measurements);

  return keys(statsByDay).map(key => {
    const date = toGMTZone(fromDateString(key));
    const difference = calculateDifferenceInDays(start, date);
    return {
      y: statsByDay[key].mean / graphYMax,
      x: difference / range + 1 / (range * 2),
      fillColor: colors.black,
      data: { value: statsByDay[key].mean },
    };
  });
};

const pointsXValueComparator = (a, b) => a.x - b.x;

const groupByDay = groupWith(
  ({ data: { date: dateA } }, { data: { date: dateB } }) =>
    toFormat('cccc, MMM d, yyyy')(dateA) ===
    toFormat('cccc, MMM d, yyyy')(dateB),
);

const generateDayCrossoverPointsReducer = (
  oneMillisecondXValue,
  tenHoursXValue,
  startDate,
  totalTime,
) => (crossoverPoints, day, index, originalArray) => {
  const nextDay = originalArray[index + 1];

  if (!nextDay || !nextDay.length) {
    return crossoverPoints;
  }

  const lastPointOfDay = day[day.length - 1];
  const firstPointOfNextDay = nextDay[0];

  if (firstPointOfNextDay.x - lastPointOfDay.x > tenHoursXValue) {
    return crossoverPoints;
  }

  const x = (toEndOfDay(lastPointOfDay.data.date) - startDate) / totalTime;

  const y = getYFromTwoPointsAndOneXValue(
    lastPointOfDay.x,
    lastPointOfDay.y,
    firstPointOfNextDay.x,
    firstPointOfNextDay.y,
    x,
  );

  return [
    ...crossoverPoints,
    {
      crossOverPoint: false,
      x,
      y,
      data: {
        date: toEndOfDay(lastPointOfDay.data.date),
      },
    },
    {
      crossOverPoint: true,
      x: x + oneMillisecondXValue,
      y,
      data: {
        date: toStartOfDay(firstPointOfNextDay.data.date),
      },
    },
  ];
};

export const generateLines = (points, startDate, endDate, totalTime) => {
  const range = calculateFullRange(startDate, endDate);
  const tenHoursXValue = (10 * HOURS_IN_MS) / range;
  const oneMillisecondXValue = tenHoursXValue / 36000000;
  const sortedPoints = sort(pointsXValueComparator, points);
  const pointsGroupedByDay = groupByDay(sortedPoints);

  const dayCrossoverPoints = pointsGroupedByDay.reduce(
    generateDayCrossoverPointsReducer(
      oneMillisecondXValue,
      tenHoursXValue,
      startDate,
      totalTime,
    ),
    [],
  );

  const sortedPointsWithDayCrossoverPointsAdded = sort(pointsXValueComparator, [
    ...sortedPoints,
    ...dayCrossoverPoints,
  ]);

  let previousX = 0;
  let previousIndex = 0;
  let lines = [];

  sortedPointsWithDayCrossoverPointsAdded.forEach(
    (point, index, originalArray) => {
      if (point.x - previousX > tenHoursXValue || point.crossOverPoint) {
        lines = append(originalArray.slice(previousIndex, index), lines);
        previousIndex = index;
      }

      if (index === originalArray.length - 1) {
        lines = append(originalArray.slice(previousIndex), lines);
      }

      previousX = point.x;
    },
  );

  return lines;
};
