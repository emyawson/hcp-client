import { createSelector } from 'reselect';

import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';
import {
  selectNumberOfTests,
  selectTestsPerDay,
  selectTestsPerMeasuredDay,
  selectMeanBG,
  selectMeanBGBeforeMeal,
  selectMeanBGAfterMeal,
  selectStandardDeviation,
  selectBGIndexes,
} from 'src/domains/diagnostics/store/selectors';

export const selectBGStats = createSelector(
  selectMeanBG,
  selectMeanBGBeforeMeal,
  selectMeanBGAfterMeal,
  selectStandardDeviation,
  (mean, meanBeforeMeal, meanAfterMeal, stdDev) => ({
    mean: Math.round(mean),
    meanBeforeMeal: Math.round(meanBeforeMeal),
    meanAfterMeal: Math.round(meanAfterMeal),
    stdDev: stdDev === EMPTY_VALUE_PLACEHOLDER ? stdDev : Math.round(stdDev),
    stdDevMeanRatio:
      stdDev === EMPTY_VALUE_PLACEHOLDER
        ? stdDev
        : Math.round((100 * stdDev) / mean),
  }),
);

export const selectGraphStatistics = createSelector(
  selectNumberOfTests,
  selectTestsPerDay,
  selectTestsPerMeasuredDay,
  selectBGStats,
  selectBGIndexes,
  (numberOfTests, testsPerDay, testsPerMeasuredDay, bgStats, indexes) => ({
    tests: {
      numberOfTests,
      testsPerDay,
      testsPerMeasuredDay,
    },
    bloodGlucose: bgStats,
    indexes,
  }),
);
