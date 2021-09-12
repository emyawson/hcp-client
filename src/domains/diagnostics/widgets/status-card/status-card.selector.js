import { createSelector, createStructuredSelector } from 'reselect';
import { compose } from 'recompose';
import { isNil, isEmpty } from 'ramda';

import {
  average,
  fixToDecimalPlace,
  getFormattedStandardDeviation,
} from 'src/domains/diagnostics/utils';
import {
  selectGlucoseMeasurementsInDateSliderRange,
  selectGlobalDatesAverageTestsPerDay,
  selectGraphThreshold,
  selectIsLoading,
} from 'src/domains/diagnostics/store/selectors';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';
import {
  calculateHypoRisk,
  hasReliableInfo,
  selectDayInHalfTimeIntervals,
  TRAFFIC_LIGHT_LABELS,
} from 'src/domains/diagnostics/scenes/blood-glucose-overview/store';

import {
  toMeanStatus,
  toVariabilityStatus,
  toHypoRiskStatus,
} from './status-card.util';

const getMeasurementValues = measurements =>
  measurements.map(measurement => measurement.value);
const filterNullValues = measurements =>
  measurements.filter(measurement => !isNil(measurement));
const calculateMean = measurements =>
  fixToDecimalPlace(average(measurements), 1);

const calculateVariability = (measurements, mean) =>
  getFormattedStandardDeviation(measurements, standardDeviation =>
    fixToDecimalPlace((standardDeviation / mean) * 100, 1),
  );

const toPercentageSuffix = value => `${value}%`;

const selectGlucoseMeasurementValues = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  compose(
    filterNullValues,
    getMeasurementValues,
  ),
);

const selectNumberOfMeasurements = createSelector(
  selectGlucoseMeasurementValues,
  measurements => measurements.length,
);

const selectHasReliableInfo = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectGlobalDatesAverageTestsPerDay,
  selectDayInHalfTimeIntervals,
  hasReliableInfo,
);

const selectMeanBloodGlucoseValue = createSelector(
  selectGlucoseMeasurementValues,
  calculateMean,
);

const selectVariabilityValue = createSelector(
  selectGlucoseMeasurementValues,
  selectMeanBloodGlucoseValue,
  calculateVariability,
);

const selectHypoRiskValue = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  calculateHypoRisk,
);

const selectMeanBloodGlucoseStatus = createSelector(
  selectMeanBloodGlucoseValue,
  selectNumberOfMeasurements,
  selectGraphThreshold,
  toMeanStatus,
);

const selectVariabilityStatus = createSelector(
  selectVariabilityValue,
  selectNumberOfMeasurements,
  toVariabilityStatus,
);

const selectHypoRiskStatus = createSelector(
  selectHypoRiskValue,
  toHypoRiskStatus,
);

const selectHypoRisk = createStructuredSelector({
  value: selectHypoRiskValue,
  status: selectHypoRiskStatus,
});

const selectMeanBloodGlucose = createStructuredSelector({
  value: selectMeanBloodGlucoseValue,
  status: selectMeanBloodGlucoseStatus,
});

const selectVariability = createStructuredSelector({
  value: compose(
    toPercentageSuffix,
    selectVariabilityValue,
  ),
  status: selectVariabilityStatus,
});

const selectPlaceholderStatusLabel = createSelector(
  selectNumberOfMeasurements,
  selectHasReliableInfo,
  (numberOfMeasurements, hasReliableInfo) => {
    if (numberOfMeasurements === 0) {
      return EMPTY_VALUE_PLACEHOLDER;
    }

    if (!hasReliableInfo) {
      return TRAFFIC_LIGHT_LABELS.INSUFFICIENT_INFO;
    }

    return '';
  },
);

const selectShowStatusLabels = createSelector(
  selectNumberOfMeasurements,
  numberOfMeasurements => numberOfMeasurements !== 0,
);

const selectShowPlaceholderStatusLabelAndHideValues = createSelector(
  selectPlaceholderStatusLabel,
  placeholderLabel => placeholderLabel !== '',
);

const selectHasData = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectIsLoading,
  (measurements, isLoading) => isLoading || !isEmpty(measurements),
);

export const StatusCardConnector = createStructuredSelector({
  hasReliableInfo: selectHasReliableInfo,
  hypoRisk: selectHypoRisk,
  meanBloodGlucose: selectMeanBloodGlucose,
  placeholderStatusLabel: selectPlaceholderStatusLabel,
  showPlaceholderStatusLabelAndHideValues: selectShowPlaceholderStatusLabelAndHideValues,
  showStatusLabels: selectShowStatusLabels,
  threshold: selectGraphThreshold,
  variability: selectVariability,
  hasData: selectHasData,
  isLoading: selectIsLoading,
});
