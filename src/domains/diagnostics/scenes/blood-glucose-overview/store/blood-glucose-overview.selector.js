import { createSelector, createStructuredSelector } from 'reselect';
import { compose } from 'recompose';

import { MEAL_TIMES } from 'src/domains/diagnostics/constants/logbook.constants';
import {
  selectBGOverviewEndDate,
  selectGlucoseMeasurementsBetweenFirstAndLast,
  selectPatientFirstMeasurementDate,
  selectPatientLastMeasurementDate,
  selectBGOverviewTimeInterval,
  selectPatient,
  selectTimeIntervals,
  selectGraphThreshold,
} from 'src/domains/diagnostics/store/selectors';

import {
  createCalculateForHypoglycaemia,
  calculateForVariability,
  calculateMeanBloodGlucose,
  calculateAvgTestsPerDay,
  calculateBloodGlucoseStartDate,
  formatTestsPerDayAvg,
  groupByTimeInterval,
  toHypoglycaemiaCount,
  toMeanBloodGlucoseStatus,
  toMeanBloodGlucoseValue,
  toTimeIntervals,
  toVariabilityStatus,
  isLastInterval,
  isFirstInterval,
  toLabelInterval,
  calculateIntervalEmptyDays,
  calculateHypoRiskForIntervals,
  toHypoRiskStatus,
  determineHasReliableInfo,
} from './blood-glucose-overview.utils';
import { NUMBER_BLOOD_GLUCOSE_OVERVIEW_COLUMNS } from './blood-glucose-overview.constants';

const numberOfColumns = () => NUMBER_BLOOD_GLUCOSE_OVERVIEW_COLUMNS;

const selectStartDate = createSelector(
  selectBGOverviewEndDate,
  selectBGOverviewTimeInterval,
  numberOfColumns,
  calculateBloodGlucoseStartDate,
);

const getDayInHalfTimeIntervals = timeIntervals =>
  timeIntervals.reduce(
    (acc, timeInterval) => {
      if (timeInterval.description === MEAL_TIMES.NIGHT) {
        acc.firstHalf.startTime = timeInterval.startTime;
        acc.secondHalf.endTime = timeInterval.startTime;
      } else if (timeInterval.description === MEAL_TIMES.BEFORE_LUNCH) {
        acc.firstHalf.endTime = timeInterval.endTime;
        acc.secondHalf.startTime = timeInterval.endTime;
      }

      return acc;
    },
    {
      firstHalf: {},
      secondHalf: {},
    },
  );

export const selectDayInHalfTimeIntervals = createSelector(
  selectTimeIntervals,
  getDayInHalfTimeIntervals,
);

const selectGroupedMeasurement = createSelector(
  selectBGOverviewTimeInterval,
  selectGlucoseMeasurementsBetweenFirstAndLast,
  selectBGOverviewEndDate,
  numberOfColumns,
  selectPatientFirstMeasurementDate,
  selectPatientLastMeasurementDate,
  groupByTimeInterval,
);

const selectGroupedMeasurementWithAvgTestsPerDay = createSelector(
  selectGroupedMeasurement,
  calculateAvgTestsPerDay,
);

export const selectVerifiedGroupMeasurements = createSelector(
  selectGroupedMeasurementWithAvgTestsPerDay,
  selectDayInHalfTimeIntervals,
  determineHasReliableInfo,
);

export const calculateAndFormatVariability = compose(
  toVariabilityStatus,
  calculateForVariability,
);

const selectVariability = createSelector(
  selectVerifiedGroupMeasurements,
  calculateAndFormatVariability,
);

export const selectAverageTestsPerDay = createSelector(
  selectVerifiedGroupMeasurements,
  formatTestsPerDayAvg,
);

export const selectHypoglycaemia = createSelector(
  selectVerifiedGroupMeasurements,
  selectGraphThreshold,
  (groupedMeasurementIntervals, { hypoglycemiaThreshold }) =>
    compose(
      toHypoglycaemiaCount,
      createCalculateForHypoglycaemia(hypoglycemiaThreshold),
    )(groupedMeasurementIntervals),
);

export const selectIsThereNextInterval = createSelector(
  selectBGOverviewTimeInterval,
  selectBGOverviewEndDate,
  selectPatientLastMeasurementDate,
  isLastInterval,
);
export const selectIsTherePrevInterval = createSelector(
  selectBGOverviewTimeInterval,
  selectStartDate,
  selectPatientFirstMeasurementDate,
  isFirstInterval,
);

const selectMeanBloodGlucoseValue = createSelector(
  selectVerifiedGroupMeasurements,
  calculateMeanBloodGlucose,
);

export const selectMeanBloodGlucoseStatistics = createSelector(
  selectMeanBloodGlucoseValue,
  toMeanBloodGlucoseValue,
);

export const selectMeanBloodGlucoseStatus = createSelector(
  selectMeanBloodGlucoseValue,
  selectGraphThreshold,
  toMeanBloodGlucoseStatus,
);

const selectDateRanges = createSelector(
  selectVerifiedGroupMeasurements,
  calculateIntervalEmptyDays,
);

export const selectFormattedDateRanges = createSelector(
  selectDateRanges,
  selectBGOverviewTimeInterval,
  compose(
    toTimeIntervals,
    toLabelInterval,
  ),
);

export const selectHypoRisk = createSelector(
  selectVerifiedGroupMeasurements,
  selectBGOverviewEndDate,
  compose(
    toHypoRiskStatus,
    calculateHypoRiskForIntervals,
  ),
);

const selectBgStatus = createStructuredSelector({
  hypoRisk: selectHypoRisk,
  meanBloodGlucose: selectMeanBloodGlucoseStatus,
  variability: selectVariability,
});

const selectBgStatistics = createStructuredSelector({
  meanBloodGlucose: selectMeanBloodGlucoseStatistics,
  testsPerDay: selectAverageTestsPerDay,
  hypoglycaemia: selectHypoglycaemia,
});

export const selectBloodGlucoseOverviewData = createStructuredSelector({
  dateRanges: selectFormattedDateRanges,
  bgStatus: selectBgStatus,
  bgStatistics: selectBgStatistics,
});

export const bloodGlucoseOverviewConnector = createStructuredSelector({
  bloodGlucoseOverview: selectBloodGlucoseOverviewData,
  thresholds: selectGraphThreshold,
  patient: selectPatient,
  endDate: selectBGOverviewEndDate,
  interval: selectBGOverviewTimeInterval,
  firstMeasurementDate: selectPatientFirstMeasurementDate,
  lastMeasurementDate: selectPatientLastMeasurementDate,
  isThereNextInterval: selectIsThereNextInterval,
  isTherePrevInterval: selectIsTherePrevInterval,
});
