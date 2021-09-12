import { createSelector, createStructuredSelector } from 'reselect';

import {
  selectShowGridLines,
  selectThreshold,
  selectTargetRange,
  selectGraphDetails,
  selectVerticalTicks,
  selectVerticalLabel,
  selectVerticalAxesCeiling,
} from 'src/domains/diagnostics/scenes/graphs/graph.selector';
import { togglePointsFilter } from 'src/domains/diagnostics/scenes/graphs/graph.util';
import {
  selectPatientStartDate,
  selectPatientEndDate,
  selectGlucoseMeasurementsInDateSliderRange,
  selectGraphToggles,
  selectGraphLoading,
  selectGraphThreshold,
} from 'src/domains/diagnostics/store/selectors';

import {
  convertMeasurementsToPoints,
  calculateFullRange,
  normalizeMeans,
  generateLines,
} from './trend-detail.util';

import {
  selectHorizontalDayTicks,
  selectHorizontalMonthYearTicks,
} from '../trend.selector';

const selectTimeRange = createSelector(
  selectPatientStartDate,
  selectPatientEndDate,
  calculateFullRange,
);

export const selectGlucoseMeasurementPoints = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectTimeRange,
  selectPatientStartDate,
  selectGraphThreshold,
  selectVerticalAxesCeiling,
  convertMeasurementsToPoints,
);

const selectFilteredGlucoseMeasurementPoints = createSelector(
  selectGlucoseMeasurementPoints,
  selectGraphToggles,
  togglePointsFilter,
);

const selectDailyMeanBloodGlucose = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectPatientStartDate,
  selectPatientEndDate,
  selectVerticalAxesCeiling,
  normalizeMeans,
);

const selectMeanBloodGlucosePoints = createSelector(
  selectDailyMeanBloodGlucose,
  selectGraphToggles,
  (means, toggles) => (toggles.showMeanBloodGlucose ? means : []),
);

const selectConnectingLines = createSelector(
  selectGlucoseMeasurementPoints,
  selectPatientStartDate,
  selectPatientEndDate,
  selectTimeRange,
  selectGraphToggles,
  (measurements, startDate, endDate, timeRange, toggles) =>
    toggles.showBloodGlucoseLines
      ? generateLines(measurements, startDate, endDate, timeRange)
      : [],
);

const selectGraphData = createSelector(
  selectMeanBloodGlucosePoints,
  selectFilteredGlucoseMeasurementPoints,
  selectConnectingLines,
  (meanBloodGlucosePoints, glucoseMeasurements, lines) => ({
    meanBloodGlucosePoints,
    glucoseMeasurements,
    lines,
  }),
);

export const trendDetailConnector = createStructuredSelector({
  measurements: selectGlucoseMeasurementsInDateSliderRange,
  verticalLabel: selectVerticalLabel,
  verticalTicks: selectVerticalTicks,
  horizontalDayTicks: selectHorizontalDayTicks,
  horizontalMonthYearTicks: selectHorizontalMonthYearTicks,
  targetRange: selectTargetRange,
  threshold: selectThreshold,
  showGridLines: selectShowGridLines,
  graphData: selectGraphData,
  graphDetails: selectGraphDetails,
  graphYMax: selectVerticalAxesCeiling,
  isLoading: selectGraphLoading,
});
