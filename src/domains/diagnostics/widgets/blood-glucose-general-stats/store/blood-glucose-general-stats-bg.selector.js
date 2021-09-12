import { isNil } from 'ramda';
import { createSelector } from 'reselect';

import {
  selectNumberOfTests,
  selectStandardDeviation,
  selectTestsPerMeasuredDay,
  selectBGIndexes,
  selectMeanBG,
  selectLowestBG,
  selectHighestBG,
  selectMeanBGBeforeMeal,
  selectMeanBGBeforeBreakfast,
  selectMeanBGBeforeLunch,
  selectMeanBGBeforeDinner,
  selectFormattedGlobalDatesAverageTestsPerDay,
  selectGraphDetailTargetRanges,
} from 'src/domains/diagnostics/store/selectors';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants.js';

import { zeroCheck } from './blood-glucose-general-stats.util.js';

export const selectTests = createSelector(
  selectNumberOfTests,
  selectFormattedGlobalDatesAverageTestsPerDay,
  selectTestsPerMeasuredDay,
  (numberOfTests, testsPerDay, testsPerMeasuredDay) => ({
    numberOfTests,
    testsPerDay: isNil(testsPerDay) ? '-' : testsPerDay < 0.1 ? 0 : testsPerDay,
    testsPerMeasuredDay:
      testsPerMeasuredDay === '0.0' || isNaN(testsPerMeasuredDay)
        ? '-'
        : testsPerMeasuredDay,
  }),
);

export const selectBGStats = createSelector(
  selectMeanBG,
  selectStandardDeviation,
  selectLowestBG,
  selectHighestBG,
  (mean, stdDev, lowestBG, highestBG) => ({
    mean: zeroCheck(Math.round(mean)),
    stdDev: stdDev === EMPTY_VALUE_PLACEHOLDER ? stdDev : Math.round(stdDev),
    lowestBG: lowestBG === Infinity ? '-' : lowestBG,
    highestBG: highestBG === -Infinity ? '-' : highestBG,
  }),
);

const roundNumberWithZeroCheck = number =>
  number ? number.toFixed(0) : zeroCheck(number);

export const selectMeanBGBeforeMeals = createSelector(
  selectMeanBGBeforeMeal,
  selectMeanBGBeforeBreakfast,
  selectMeanBGBeforeLunch,
  selectMeanBGBeforeDinner,
  (
    meanBeforeMeals,
    meanBeforeBreakfast,
    meanBeforeLunch,
    meanBeforeDinner,
  ) => ({
    meanBeforeMeals: roundNumberWithZeroCheck(meanBeforeMeals),
    meanBeforeBreakfast: roundNumberWithZeroCheck(meanBeforeBreakfast),
    meanBeforeLunch: roundNumberWithZeroCheck(meanBeforeLunch),
    meanBeforeDinner: roundNumberWithZeroCheck(meanBeforeDinner),
  }),
);

export const selectAllBGStats = createSelector(
  selectTests,
  selectBGStats,
  selectGraphDetailTargetRanges,
  selectBGIndexes,
  selectMeanBGBeforeMeals,
  (
    tests,
    meanBG,
    {
      targetBloodGlucoseMinimum,
      targetBloodGlucoseMaximum,
      abovePercentage,
      aboveCount,
      belowAndHypoCount,
      belowAndHypoPercentage,
      withinPercentage,
      withinCount,
      hypoglycemiaThreshold,
      hypoglycaemiaNumber,
    },
    indexes,
    meanBeforeMeals,
  ) => ({
    tests,
    meanBG,
    targetRange: {
      targetBloodGlucoseMinimum,
      targetBloodGlucoseMaximum,
      abovePercentage,
      aboveCount,
      belowAndHypoCount,
      belowAndHypoPercentage,
      withinPercentage,
      withinCount,
    },
    hypos: {
      hypoglycemiaThreshold,
      hypoglycaemiaNumber,
    },
    indexes: {
      lbgi: indexes.lbgi,
      hbgi: indexes.hbgi,
    },
    meanBeforeMeals,
  }),
);
