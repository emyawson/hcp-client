import { createSelector } from 'reselect';

import {
  average,
  calculateLowBloodGlucoseIndex,
  calculateHighBloodGlucoseIndex,
  getFormattedStandardDeviation,
  getBeforeMealMean,
} from 'src/domains/diagnostics/utils';
import { diffInDaysInclusiveOfEnds } from 'src/domains/diagnostics/utils';
import {
  selectGlucoseMeasurementsInDateSliderRange,
  selectPatientStartDate,
  selectPatientEndDate,
  selectTimeIntervals,
  selectGlucoseMeasurementsByDay,
} from 'src/domains/diagnostics/store/selectors';
import { getFormattedBloodGlucoseIndex } from 'src/domains/diagnostics/utils/graph-statistics.util';

export const selectLowestBG = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  measurements =>
    Math.min(...measurements.map(measurement => measurement.value)),
);

export const selectHighestBG = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  measurements =>
    Math.max(...measurements.map(measurement => measurement.value)),
);

export const selectBGIndexes = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  measurements => ({
    lbgi: getFormattedBloodGlucoseIndex(
      calculateLowBloodGlucoseIndex,
      measurements,
    ),
    hbgi: getFormattedBloodGlucoseIndex(
      calculateHighBloodGlucoseIndex,
      measurements,
    ),
  }),
);

export const selectNumberOfTests = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  measurements => measurements.length,
);

export const selectNumberOfDaysInDateRange = createSelector(
  selectPatientStartDate,
  selectPatientEndDate,
  diffInDaysInclusiveOfEnds,
);

export const selectNumberOfDaysWithMeasurement = createSelector(
  selectGlucoseMeasurementsByDay,
  glucoseMeasurementsGroupedByDay => glucoseMeasurementsGroupedByDay.length,
);

export const selectTotalBGValues = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  measurements => measurements.reduce((acc, bg) => acc + bg.value, 0),
);

export const selectTestsPerDay = createSelector(
  selectNumberOfTests,
  selectNumberOfDaysInDateRange,
  (numberOfTests, numberOfDays) => (numberOfTests / numberOfDays).toFixed(1),
);

export const selectTestsPerMeasuredDay = createSelector(
  selectNumberOfTests,
  selectNumberOfDaysWithMeasurement,
  (numberOfTests, numberOfDaysWithMeasurement) =>
    (numberOfTests / numberOfDaysWithMeasurement).toFixed(1),
);

export const selectMeanBG = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  measurements => average(measurements.map(measurement => measurement.value)),
);

export const selectStandardDeviation = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  measurements =>
    getFormattedStandardDeviation(
      measurements.map(measurement => measurement.value),
    ),
);

export const selectMeanBGBeforeMeal = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  measurements =>
    average(
      measurements
        .filter(measurement => measurement.beforeMeal)
        .map(measurement => measurement.value),
    ),
);

export const selectMeanBGAfterMeal = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  measurements =>
    average(
      measurements
        .filter(measurement => measurement.afterMeal)
        .map(measurement => measurement.value),
    ),
);

export const selectMeanBGBeforeBreakfast = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectTimeIntervals,
  (measurements, timeIntervals) =>
    getBeforeMealMean(measurements, timeIntervals, 'BREAKFAST', 'LUNCH'),
);

export const selectMeanBGBeforeLunch = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectTimeIntervals,
  (measurements, timeIntervals) =>
    getBeforeMealMean(measurements, timeIntervals, 'LUNCH', 'DINNER'),
);

export const selectMeanBGBeforeDinner = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectTimeIntervals,
  (measurements, timeIntervals) =>
    getBeforeMealMean(measurements, timeIntervals, 'DINNER', 'BEDTIME'),
);
