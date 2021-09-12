import { createSelector, createStructuredSelector } from 'reselect';
import { map, max } from 'ramda';

import { translate } from 'src/i18n'; // TODO: move to diagnostics
import {
  average,
  getFormattedStandardDeviation,
  convertISOToJsGMT,
  isEqual,
} from 'src/domains/diagnostics/utils';
import {
  selectGraph,
  selectGraphType,
  selectLogbookType,
  selectGlucoseMeasurementsInDateSliderRange,
  selectGraphToggles,
  selectGraphDetailTargetRanges,
  selectFormattedGlobalDatesAverageTestsPerDay,
  selectPreIdealIntervalsFromThresholds,
  selectGraphThreshold,
  selectPatientStartDate,
  selectPatientEndDate,
  selectPatientLastMeasurementDate,
  selectPatient,
} from 'src/domains/diagnostics/store/selectors';
import {
  GRAPH_Y_MAX,
  HYPO_TICK_COLOR,
  TARGET_RANGE_TICK_COLOR,
  TARGET_RANGE_MAX_TICK_KEY,
  TARGET_RANGE_MIN_TICK_KEY,
  THRESHOLD_TICK_KEY,
  GRAPH_Y_INTERVAL,
} from 'src/domains/diagnostics/scenes/graphs/graph.constants';

import {
  formatGraphsDate,
  measurementsToDateRange,
  normalizeGraphTargetRange,
  normalizeGraphThreshold,
  normalizeVerticalTickValues,
  createVerticalTick,
} from './graph.util';

export const selectTranslatedGraphType = createSelector(
  selectGraphType,
  graphType => {
    switch (graphType.toLowerCase()) {
      case 'trend':
        return translate('graphs.trendTitle');
      case 'details':
        return translate('graphs.detailTitle');
      default:
        return '';
    }
  },
);

const getMeasurementValues = measurements =>
  map(measurement => measurement.value, measurements);

export const selectGraphDetailBloodGlucose = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectFormattedGlobalDatesAverageTestsPerDay,
  (measurements, testsPerDay) => {
    const bloodGlucoseValues = getMeasurementValues(measurements);
    const bloodGlucoseStandardDeviation = getFormattedStandardDeviation(
      bloodGlucoseValues,
      Math.round,
    );
    return {
      bloodGlucoseMean: Math.round(average(bloodGlucoseValues)),
      bloodGlucoseStandardDeviation,
      testsPerDay,
    };
  },
);

const findHighestGlucoseMeasurementValue = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  measurements => measurements.reduce((acc, val) => max(acc, val.value), 0),
);

const findHigherMultipleOf = (value, multiplication) =>
  value >= GRAPH_Y_MAX
    ? GRAPH_Y_MAX
    : Math.ceil(value / multiplication) * multiplication;

export const selectVerticalAxesCeiling = createSelector(
  findHighestGlucoseMeasurementValue,
  selectPreIdealIntervalsFromThresholds,
  (value, { upperLimit }) =>
    value < upperLimit
      ? findHigherMultipleOf(upperLimit, GRAPH_Y_INTERVAL)
      : findHigherMultipleOf(value, GRAPH_Y_INTERVAL),
);

export const selectGraphDetails = createSelector(
  selectGraphDetailBloodGlucose,
  selectGraphDetailTargetRanges,
  (bloodGlucoseValues, targetRangesValues) => ({
    bloodGlucoseValues,
    targetRangesValues,
  }),
);

export const selectDateRange = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  measurements => {
    const dateRange = measurementsToDateRange(measurements);
    return {
      start: formatGraphsDate(dateRange.start),
      end: formatGraphsDate(dateRange.end),
    };
  },
);

export const selectVerticalLabel = val => [
  {
    value: 0.5,
    label: `${translate('graphs.axisLabels.bloodGlucose')} (${translate(
      'graphs.axisLabels.mgPerDL',
    )})`,
  },
];

export const selectShowGridLines = createSelector(
  selectGraphToggles,
  toggles => !!toggles.showGridLines,
);

export const selectTargetRange = createSelector(
  selectGraphThreshold,
  selectVerticalAxesCeiling,
  normalizeGraphTargetRange,
);

export const selectThreshold = createSelector(
  selectGraphThreshold,
  selectVerticalAxesCeiling,
  normalizeGraphThreshold,
);

const verticalTicks = [
  createVerticalTick(0),
  createVerticalTick(50),
  createVerticalTick(100),
  createVerticalTick(150),
  createVerticalTick(200),
  createVerticalTick(250),
  createVerticalTick(300),
  createVerticalTick(350),
  createVerticalTick(400),
];

export const selectThresholdTicks = createSelector(
  selectThreshold,
  selectTargetRange,
  (threshold, targetRange) => [
    {
      value: targetRange.max,
      label: `${targetRange.data.max}`,
      key: TARGET_RANGE_MAX_TICK_KEY,
      gridLine: false,
      color: TARGET_RANGE_TICK_COLOR,
    },
    {
      value: targetRange.min,
      label: `${targetRange.data.min}`,
      key: TARGET_RANGE_MIN_TICK_KEY,
      gridLine: false,
      color: TARGET_RANGE_TICK_COLOR,
    },
    {
      value: threshold.value,
      label: `${threshold.data.value}`,
      key: THRESHOLD_TICK_KEY,
      gridLine: false,
      color: HYPO_TICK_COLOR,
    },
  ],
);

// This is for use by the selectors of graphs built with the graphing library in /lib
export const selectVerticalTicks = createSelector(
  selectThresholdTicks,
  selectVerticalAxesCeiling,
  (thresholdTicks, graphYMax) => {
    const normalizedVerticalTicks = normalizeVerticalTickValues(
      verticalTicks,
      graphYMax,
    );
    return [...normalizedVerticalTicks, ...thresholdTicks];
  },
);

const selectStartDate = createSelector(
  selectPatientStartDate,
  date => (isEqual(date, convertISOToJsGMT(null)) ? '' : date),
);

const selectEndDate = createSelector(
  selectPatientEndDate,
  date => (isEqual(date, convertISOToJsGMT(null)) ? '' : date),
);

export const graphConnector = createStructuredSelector({
  dateRange: selectDateRange,
  graph: selectGraph,
  graphType: selectGraphType,
  translatedGraphType: selectTranslatedGraphType,
  logbookType: selectLogbookType,
  startDate: selectStartDate,
  endDate: selectEndDate,
  lastMeasurementDate: selectPatientLastMeasurementDate,
  patient: selectPatient,
  selectGraphToggles,
});
