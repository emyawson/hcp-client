import {
  flatten,
  groupBy,
  length,
  map,
  mergeAll,
  pipe,
  reduce,
  sort,
  values,
  filter,
} from 'ramda';
import React from 'react';
import { groupWith, isNil } from 'ramda';

import { colors } from 'src/domains/diagnostics/styles';
import {
  hasSame,
  convertDateToWeeklyFloat,
  toFormat,
  epochTime,
  diffHours,
} from 'src/domains/diagnostics/utils';

import {
  GRAPHS,
  GRAPH_STANDARD_DAY,
  GRAPH_TYPE_DETAILS,
  GRAPH_Y_MIN,
  GRAPH_Y_MAX,
  Y_AXIS_TICK_VISIBILITY_TOLERANCE,
  GRAPH_Y_INTERVAL,
  BOLUS_TYPE_ICONS,
} from './graph.constants';

export const getMeasurementDates = measurements =>
  measurements.map(measurement => measurement.date);

export const measurementsToDateRange = measurements =>
  getMeasurementDates(measurements).reduce(
    (acc, date) => ({
      start: !acc.start || acc.start > date ? date : acc.start,
      end: !acc.end || acc.end < date ? date : acc.end,
    }),
    {},
  );

export const isSameDay = (date1, date2) => hasSame('day', date1, date2);

export const removeDuplicateDaysFromSortedDateArray = reduce((dates, date) => {
  if (!dates.length) {
    return [date];
  }
  if (isSameDay(date, dates[dates.length - 1])) {
    return dates;
  }
  return [...dates, date];
}, []);

export const getMeasurementsTotalDays = pipe(
  getMeasurementDates,
  sort((a, b) => new Date(a).getTime() - new Date(b).getTime()),
  removeDuplicateDaysFromSortedDateArray,
  length,
);

export const formatGraphsDate = date =>
  date ? toFormat('LL/dd/yyyy')(date) : '';

export const createYAxisTickValues = (threshold, steps) => {
  const {
    glucoseIdealIntervalMax,
    glucoseIdealIntervalMin,
    hypoglycemiaThreshold,
  } = threshold;
  const ticks = [];
  let tickValue = 0;
  while (tickValue <= 400) {
    if (
      Math.abs(tickValue - glucoseIdealIntervalMax) >
        Y_AXIS_TICK_VISIBILITY_TOLERANCE &&
      Math.abs(tickValue - glucoseIdealIntervalMin) >
        Y_AXIS_TICK_VISIBILITY_TOLERANCE &&
      Math.abs(tickValue - hypoglycemiaThreshold) >
        Y_AXIS_TICK_VISIBILITY_TOLERANCE
    ) {
      ticks.push(tickValue);
    }
    tickValue += steps;
  }
  return ticks.sort((a, b) => a - b);
};
export const createThresholdTicks = threshold => {
  const {
    glucoseIdealIntervalMax,
    glucoseIdealIntervalMin,
    hypoglycemiaThreshold,
  } = threshold;
  const idealIntervalTicks = [glucoseIdealIntervalMax];
  if (
    glucoseIdealIntervalMin - hypoglycemiaThreshold >
      Y_AXIS_TICK_VISIBILITY_TOLERANCE &&
    glucoseIdealIntervalMax - glucoseIdealIntervalMin >
      Y_AXIS_TICK_VISIBILITY_TOLERANCE
  ) {
    idealIntervalTicks.push(glucoseIdealIntervalMin);
  }
  return {
    hypoglycemiaTicks: [hypoglycemiaThreshold],
    idealIntervalTicks,
  };
};
export const sharedAxes = threshold => {
  const { hypoglycemiaTicks, idealIntervalTicks } = createThresholdTicks(
    threshold,
  );
  const YAxisLeft = {
    name: 'y-axis-left-1',
    tickValues: createYAxisTickValues(threshold, GRAPH_Y_INTERVAL),
    tickPadding: 1,
    type: 'y',
  };
  const YAxisLeftThresholdHypo = {
    name: 'y-axis-left-2',
    style: {
      line: { stroke: 'none' },
      ticks: { line: { stroke: colors.red } },
    },
    tickSizeInner: -1,
    tickValues: hypoglycemiaTicks,
    tickFormat: tickValue => <tspan fill={colors.red}>{tickValue}</tspan>,
    tickPadding: 1,
    type: 'y',
  };
  const YAxisLeftThresholdMinMax = {
    name: 'y-axis-left-3',
    style: {
      line: { stroke: 'none' },
      ticks: { line: { stroke: colors.green } },
    },
    tickSizeInner: -1,
    tickValues: idealIntervalTicks,
    tickFormat: tickValue => <tspan fill={colors.green}>{tickValue}</tspan>,
    tickPadding: 1,
    type: 'y',
  };
  return [YAxisLeft, YAxisLeftThresholdHypo, YAxisLeftThresholdMinMax];
};
export const generateShapeType = (bg, isMean = false) => {
  const shape = isMean
    ? 'circle'
    : bg.beforeMeal || bg.afterMeal
      ? 'rectangle'
      : 'cross';
  return !isMean && bg.value > 400 ? 'triangle' : shape;
};
export const generateShapeStyle = bg => {
  const strokeColor = bg.aboveTargetRange
    ? colors.blueLight
    : bg.belowTargetRange
      ? colors.red
      : colors.charcoal;
  const fillColor = bg.beforeMeal ? colors.white : strokeColor;
  return {
    strokeColor,
    fillColor,
  };
};
export const generateShape = (bgVal, isMean = false) => {
  const bg = isMean ? { value: bgVal } : bgVal;
  return {
    type: generateShapeType(bg, isMean),
    style: generateShapeStyle(bg),
  };
};

export const getToolTipValueColor = (value, threshold, targetRange) => {
  const { max } = targetRange;

  if (value > max) {
    return colors.blueMarine;
  } else if (value >= threshold && value <= max) {
    return colors.black;
  } else {
    return colors.red;
  }
};

export const isStandardDayDetailGraph = (graph, graphType) =>
  graph === GRAPH_STANDARD_DAY && graphType === GRAPH_TYPE_DETAILS;

const normalizeTargetRange = (
  { glucoseIdealIntervalMin, glucoseIdealIntervalMax },
  floor,
  ceiling,
) => ({
  min: glucoseIdealIntervalMin / ceiling,
  max: glucoseIdealIntervalMax / ceiling,
  data: {
    min: glucoseIdealIntervalMin,
    max: glucoseIdealIntervalMax,
  },
});

export const normalizeGraphTargetRange = (threshold, graphYMax = GRAPH_Y_MAX) =>
  normalizeTargetRange(threshold, GRAPH_Y_MIN, graphYMax);

const normalizeThreshold = ({ hypoglycemiaThreshold }, floor, ceiling) => ({
  value: hypoglycemiaThreshold / ceiling,
  data: { value: hypoglycemiaThreshold },
});

export const normalizeGraphThreshold = (threshold, graphYMax = GRAPH_Y_MAX) =>
  normalizeThreshold(threshold, GRAPH_Y_MIN, graphYMax);

export const mergeOnDate = (...arraysOfObjectsWithDateProperties) => {
  const byDate = ({ date }) => date;

  return pipe(
    flatten,
    groupBy(byDate),
    values,
    map(mergeAll),
  )(arraysOfObjectsWithDateProperties);
};

export const createVerticalTick = value => ({
  value: value,
  label: value.toString(),
  gridLine: true,
});

export const normalizeVerticalTickValues = (verticalTicks, ceiling) => {
  if (!verticalTicks.some(tick => tick.value === ceiling)) {
    const ceilingVerticalTick = createVerticalTick(ceiling);
    verticalTicks.push(ceilingVerticalTick);
  }

  return verticalTicks
    .filter(tick => tick.value <= ceiling)
    .map(tick => ({ ...tick, value: tick.value / ceiling }));
};

export const filterForHighestDailyTotalInsulinValues = totals => {
  const dailyTotal = totals.reduce((acc, measurement) => {
    const date = toFormat('D')(measurement.date);

    return {
      ...acc,
      [date]:
        !acc[date] || measurement.bolusValue > acc[date].bolusValue
          ? measurement
          : acc[date],
    };
  }, {});

  return values(dailyTotal);
};

export const keepBolusOfRegisterType = registerTypeString => ({
  registerType,
}) => registerType === registerTypeString;

export const toBolusShape = ({
  date,
  value,
  remark,
  registerType,
  bolusType,
}) => ({
  date,
  bolusValue: value,
  bolusRemark: remark,
  bolusRegisterType: registerType,
  bolusType: bolusType,
});

export const toBasalShape = ({
  date,
  cbrf,
  profile,
  remark,
  tbrdec,
  tbrinc,
}) => ({
  date,
  basalCbrf: cbrf,
  basalRateProfile: profile,
  basalRemark: remark,
  basalTbrdec: tbrdec,
  basalTbrinc: tbrinc,
});

export const createBolusObject = registerTypeString =>
  pipe(
    filter(keepBolusOfRegisterType(registerTypeString)),
    map(toBolusShape),
  );

export const getBolusTypeIcon = measurement => {
  const measurementBolusType = measurement.bolusType.toLowerCase();

  const bolusTypeIcons = {
    std: BOLUS_TYPE_ICONS.STANDARD,
    scr: BOLUS_TYPE_ICONS.QUICK,
    ext: BOLUS_TYPE_ICONS.EXTENDED,
    mul: BOLUS_TYPE_ICONS.MULTIWAVE,
  };

  return bolusTypeIcons[measurementBolusType];
};

export const togglePointsFilter = (points, toggles) =>
  points.filter(point => {
    const showAfterMeal =
      point.data.afterMeal && toggles.showBloodGlucoseAfterMealPoints;
    const showBeforeMeal =
      point.data.beforeMeal && toggles.showBloodGlucoseBeforeMealPoints;
    const showRegularPoint =
      !(point.data.afterMeal || point.data.beforeMeal) &&
      toggles.showBloodGlucosePoints;

    return showAfterMeal || showBeforeMeal || showRegularPoint;
  });

export const convertMeasurementsToPoints = (measurements, thresholds = {}) =>
  measurements.map(measurement => {
    let shape = 'x';

    if (measurement.value > GRAPH_Y_MAX) {
      shape = 'triangle';
    } else if (
      shape !== 'triangle' &&
      (measurement.beforeMeal || measurement.afterMeal)
    ) {
      shape = 'square';
    }

    const x = convertDateToWeeklyFloat(measurement.date);
    const y = shape === 'triangle' ? GRAPH_Y_MAX : measurement.value;

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

export const navigateToLogbook = (
  history,
  date,
  changeLogbookType,
  logbookType,
) => {
  if (history.location.pathname.indexOf(GRAPHS.LOGBOOK) !== -1) {
    return;
  }

  const dateParam = epochTime(date);
  history.push(`${GRAPHS.LOGBOOK}/${dateParam}`);
  changeLogbookType(logbookType);
};

const getSlope = (x1, y1, x2, y2) => (y2 - y1) / (x2 - x1);
const getYIntercept = (x, y, slope) => y - slope * x;
const getY = (x, yIntercept, slope) => slope * x + yIntercept;

export const getYFromTwoPointsAndOneXValue = (x1, y1, x2, y2, x3) => {
  const slope = getSlope(x1, y1, x2, y2);
  const yIntercept = getYIntercept(x1, y1, slope);
  return getY(x3, yIntercept, slope);
};

// function that checks if there's more than x hours gap between dates
export const hourGapNotGreaterThanXHours = (dateA, dateB, numHours) => {
  const diff = diffHours(dateB, dateA);
  const hourGapNotGreaterThanX = diff.toObject().hours < numHours;
  const zeroGapBetweenDates = isNil(diff.toObject().hours);
  return hourGapNotGreaterThanX || zeroGapBetweenDates;
};

// Used by selectFilteredLines selectors in standard-day-detail as the map callback
// Groups the data to create LineSeries, points should not be more than x hours apart
export const generateLinesWithinGaps = line =>
  groupWith((a, b) => {
    const aDate = a.data.date;
    const bDate = b.data.date;
    return hourGapNotGreaterThanXHours(aDate, bDate, 10);
  }, line);

const DATE_WITHOUT_TIME_FORMAT = 'MMM d, yyyy';
export const areDatesTheSameDay = (dateA, dateB) => {
  const format = toFormat(DATE_WITHOUT_TIME_FORMAT);
  return dateB == null || dateA == null
    ? false
    : format(dateA) === format(dateB);
};
