import { createSelector, createStructuredSelector } from 'reselect';
import { isNil } from 'ramda';

import { colors } from 'src/domains/diagnostics/styles';
import {
  convertGMTDateToFloat,
  hourStringToFloat,
} from 'src/domains/diagnostics/utils';
import {
  selectShowGridLines,
  selectThreshold,
  selectTargetRange,
  selectVerticalTicks,
  selectVerticalLabel,
  selectVerticalAxesCeiling,
  selectGraphDetails,
} from 'src/domains/diagnostics/scenes/graphs/graph.selector';
import {
  togglePointsFilter,
  generateLinesWithinGaps,
  isStandardDayDetailGraph,
} from 'src/domains/diagnostics/scenes/graphs/graph.util';
import {
  GRAPH_Y_MIN,
  GRAPH_Y_MAX,
} from 'src/domains/diagnostics/scenes/graphs/graph.constants';
import {
  selectTimeIntervals,
  selectGlucoseMeasurementsInDateSliderRange,
  selectGraphThreshold,
  selectGraphStartTime,
  selectGraph,
  selectGraphType,
  selectGraphToggles,
  selectGraphLoading,
} from 'src/domains/diagnostics/store/selectors';

import {
  formatHours,
  glucoseValueLinesConnector,
  groupGlucoseValuesBy24HourIntervals,
  meanBgPointsTransform,
  groupByTimeInterval,
  parseTimeIntervalFloats,
  getParsedIntervalIcon,
  getParsedIntervalLabel,
  getParsedIntervalTick,
  getBackgroundPanels,
  includeInitialPanel,
  adjustValueByDay,
  sortGlucoseValues,
  parseDailyGlucoseValues,
} from './standard-day-detail.util';
import { HOURS_IN_DAY } from './standard-day-detail.constant';

export const selectNumericalGraphStartTime = createSelector(
  selectGraphStartTime,
  selectGraph,
  selectGraphType,
  (graphStartTime, graph, graphType) =>
    isStandardDayDetailGraph(graph, graphType)
      ? hourStringToFloat(graphStartTime)
      : 0,
);

export const selectHourTimeHorizontalTicks = createSelector(
  selectNumericalGraphStartTime,
  numericalGraphStartTime =>
    Array.from({ length: HOURS_IN_DAY + 1 })
      .map((hour, index) => {
        const hourIndex = index + numericalGraphStartTime;

        return {
          value: index / HOURS_IN_DAY,
          label:
            hourIndex > HOURS_IN_DAY
              ? formatHours(hourIndex - HOURS_IN_DAY)
              : formatHours(hourIndex),
          isTickAtEndOfXAxis: index / HOURS_IN_DAY === 1,
        };
      })
      .filter((hour, index) => index % 3 === 0),
);

export const selectBackgroundPanels = createSelector(
  selectNumericalGraphStartTime,
  selectTimeIntervals,
  (numericalGraphStartTime, timeIntervals) => {
    const backgroundPanels = parseTimeIntervalFloats(timeIntervals).map(
      parsedInterval =>
        getBackgroundPanels(parsedInterval, numericalGraphStartTime),
    );

    return includeInitialPanel(backgroundPanels);
  },
);

export const selectTimeIntervalHorizontalTicks = createSelector(
  selectNumericalGraphStartTime,
  selectTimeIntervals,
  (numericalGraphStartTime, timeIntervals) => {
    const parsedIntervals = parseTimeIntervalFloats(timeIntervals);

    const icons = parsedIntervals.map(parsedInterval =>
      getParsedIntervalIcon(parsedInterval, numericalGraphStartTime),
    );

    const labels = parsedIntervals
      .map(parsedInterval =>
        getParsedIntervalLabel(parsedInterval, numericalGraphStartTime),
      )
      .filter(intervalLabel => !isNil(intervalLabel.value));

    const ticks = parsedIntervals.map(parsedInterval =>
      getParsedIntervalTick(parsedInterval, numericalGraphStartTime),
    );

    return [...icons, ...labels, ...ticks];
  },
);

const normalizePoints = (points = [], floor, ceiling) =>
  points.map((point, index) => {
    const { x, y } = point;

    return {
      ...point,
      x: x / HOURS_IN_DAY,
      y: y / ceiling,
    };
  });

// TODO: Find a way to refactor this since similar functions are used in multiple places
export const convertMeasurementsToPoints = (
  measurements,
  thresholds = {},
  minimumXValue,
) =>
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

    let x = convertGMTDateToFloat(measurement.date) - minimumXValue;

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
      x: adjustValueByDay(x),
      y,
      strokeColor,
      fillColor,
      data: measurement,
    };
  });

export const selectPoints = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectGraphThreshold,
  selectNumericalGraphStartTime,
  selectVerticalAxesCeiling,
  (measurements, thresholds, numericalStart, graphYMax) =>
    normalizePoints(
      convertMeasurementsToPoints(measurements, thresholds, numericalStart),
      GRAPH_Y_MIN,
      graphYMax,
    ),
);

export const selectFilteredPoints = createSelector(
  selectPoints,
  selectGraphToggles,
  togglePointsFilter,
);

const createGlucoseValueLines = (measurements, minimumXValue) => {
  const glucoseValuesInDays = groupGlucoseValuesBy24HourIntervals(
    measurements,
    minimumXValue,
  );

  const formattedGlucoseValuesInDays = glucoseValuesInDays.map(
    (dailyGlucoseValues, index) =>
      dailyGlucoseValues
        .map(glucoseValue =>
          parseDailyGlucoseValues(glucoseValue, minimumXValue, index),
        )
        .sort(sortGlucoseValues),
  );

  return glucoseValueLinesConnector(formattedGlucoseValuesInDays);
};

const normalizeLines = (lines, floor, ceiling) =>
  lines.map(line =>
    line.map((datum, index) => {
      const { x, y } = datum;

      return {
        x: x / HOURS_IN_DAY,
        y: y / ceiling,
        data: datum,
      };
    }),
  );

export const selectConnectingLines = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectGraphThreshold,
  selectNumericalGraphStartTime,
  selectVerticalAxesCeiling,
  (measurements, thresholds, numericalStart, graphYMax) =>
    normalizeLines(
      createGlucoseValueLines(measurements, numericalStart),
      GRAPH_Y_MIN,
      graphYMax,
    ),
);

const selectFilteredConnectingLines = createSelector(
  selectConnectingLines,
  selectGraphToggles,
  (lines, toggles) => {
    const newLines = lines.map(generateLinesWithinGaps);
    return toggles.showBloodGlucoseLines ? newLines : [];
  },
);

export const convertMeasurementsToMeanPoints = (
  measurements,
  timeIntervals,
  minimumXValue,
) => {
  const bgPoints = measurements.map(glucoseValue => ({
    x: convertGMTDateToFloat(glucoseValue.date),
    y: glucoseValue.value,
  }));

  return meanBgPointsTransform(
    groupByTimeInterval(bgPoints, timeIntervals),
    minimumXValue,
  );
};

export const selectTimeIntervalMeanPoints = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectTimeIntervals,
  selectNumericalGraphStartTime,
  selectVerticalAxesCeiling,
  (measurements, timeIntervals, numericalStart, graphYMax) =>
    normalizePoints(
      convertMeasurementsToMeanPoints(
        measurements,
        timeIntervals,
        numericalStart,
      ),
      GRAPH_Y_MIN,
      graphYMax,
    ),
);

const selectFilteredMeanPoints = createSelector(
  selectTimeIntervalMeanPoints,
  selectGraphToggles,
  (meanPoints, toggles) => (toggles.showMeanBloodGlucose ? meanPoints : []),
);

export const standardDayDetailConnector = createStructuredSelector({
  measurements: selectGlucoseMeasurementsInDateSliderRange,
  points: selectFilteredPoints,
  meanPoints: selectFilteredMeanPoints,
  backgroundPanels: selectBackgroundPanels,
  lines: selectFilteredConnectingLines,
  verticalLabel: selectVerticalLabel,
  verticalTicks: selectVerticalTicks,
  timeHorizontalTicks: selectHourTimeHorizontalTicks,
  timeIntervalHorizontalTicks: selectTimeIntervalHorizontalTicks,
  targetRange: selectTargetRange,
  threshold: selectThreshold,
  showGridLines: selectShowGridLines,
  graphDetails: selectGraphDetails,
  graphYMax: selectVerticalAxesCeiling,
  isLoading: selectGraphLoading,
});
