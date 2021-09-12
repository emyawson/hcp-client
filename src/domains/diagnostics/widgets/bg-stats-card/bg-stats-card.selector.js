import { createStructuredSelector, createSelector } from 'reselect';
import { map, compose, isEmpty } from 'ramda';

import {
  average,
  getFormattedStandardDeviation,
} from 'src/domains/diagnostics/utils';
import {
  selectIsLoading,
  selectGlucoseMeasurementsInDateSliderRange,
  selectFormattedGlobalDatesAverageTestsPerDay,
} from 'src/domains/diagnostics/store/selectors/diagnostics.selector';
import { selectMeasurementUnit } from 'src/domains/diagnostics/store/selectors';

const getMeasurementValues = measurements =>
  map(measurement => measurement.value, measurements);

const toDashIfMatch = match => value => (value !== match ? value : '-');

const selectGlucoseMeasurementValues = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  getMeasurementValues,
);

const selectTotalTests = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  measurements => measurements.length,
);

const calculateBloodGlucoseStandardDeviation = (
  bloodGlucoseValues,
  totalTests,
) => getFormattedStandardDeviation(bloodGlucoseValues, Math.round);

const selectBloodGlucoseStandardDeviation = createSelector(
  selectGlucoseMeasurementValues,
  selectTotalTests,
  compose(
    toDashIfMatch(null),
    calculateBloodGlucoseStandardDeviation,
  ),
);

const calculateBloodGlucoseMean = (bloodGlucoseValues, totalTests) =>
  totalTests > 0 ? Math.round(average(bloodGlucoseValues)) : null;

const selectBloodGlucoseMean = createSelector(
  selectGlucoseMeasurementValues,
  selectTotalTests,
  compose(
    toDashIfMatch(null),
    calculateBloodGlucoseMean,
  ),
);

const selectHasData = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectIsLoading,
  (measurements, isLoading) => isLoading || !isEmpty(measurements),
);

export const BGStatsCardConnector = createStructuredSelector({
  bloodGlucoseMean: selectBloodGlucoseMean,
  bloodGlucoseStandardDeviation: selectBloodGlucoseStandardDeviation,
  testsPerDay: compose(
    toDashIfMatch(null),
    selectFormattedGlobalDatesAverageTestsPerDay,
  ),
  numberOfTests: selectTotalTests,
  bgMeasurementUnit: selectMeasurementUnit,
  isLoading: selectIsLoading,
  hasData: selectHasData,
});
