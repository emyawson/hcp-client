import { createSelector } from 'reselect';
import { path, filter, map, isNil, compose, pick, propOr, values } from 'ramda';

import {
  convertISOToJsGMT,
  isDateInDateRange,
  fixToDecimalPlace,
  percentage,
  toFormat,
  objectISODateToJsDateGMT,
} from 'src/domains/diagnostics/utils';
import {
  toBasalShape,
  createBolusObject,
} from 'src/domains/diagnostics/scenes/graphs/graph.util';
import {
  EMPTY_VALUE_PLACEHOLDER,
  MINUTES_IN_DAY,
  BASAL_REMARKS,
  BOLUS_TYPE,
} from 'src/domains/diagnostics/store/constants';
import { calculateIntervalAverageTestsPerDay } from 'src/domains/diagnostics/utils/measurements';

import { selectStripDeliveryThresholds } from './strip-delivery.selectors';
import {
  selectPatientFirstMeasurementDate,
  selectPatientLastMeasurementDate,
  selectPatientStartDate,
  selectPatientEndDate,
} from './patient-date-range.selector';

import { diffInDaysInclusiveOfEnds } from '../../utils';

// Low level selectors

export const selectBGOverviewTimeInterval = path([
  'ui',
  'patientDashboard',
  'bgOverview',
  'timeInterval',
]);

export const selectBGOverviewEndDate = createSelector(
  path(['ui', 'patientDashboard', 'bgOverview', 'endDate']),
  convertISOToJsGMT,
);

export const selectDashboard = path(['ui', 'patientDashboard']);
export const selectGraph = path(['ui', 'patientDashboard', 'graph']);
export const selectGraphType = path(['ui', 'patientDashboard', 'graphType']);
export const selectLogbookType = path([
  'ui',
  'patientDashboard',
  'logbookType',
]);

export const selectGraphStartTime = path([
  'ui',
  'patientDashboard',
  'graphStartTime',
]);

// TODO: Remove once local boolean values in reducer is moved to request sequence
export const selectIsFetchingClinicalData = path([
  'ui',
  'patientDashboard',
  'isFetchingClinicalData',
]);

// TODO: Remove once local boolean values in reducer is moved to request sequence
export const selectIsFetchingThreshold = path([
  'ui',
  'patientDashboard',
  'isFetchingThreshold',
]);

// TODO: Remove once local boolean values in reducer is moved to request sequence
export const selectIsFetchingTimeIntervals = path([
  'ui',
  'patientDashboard',
  'isFetchingTimeIntervals',
]);

export const selectMeasurementUnit = path([
  'ui',
  'patientDashboard',
  'bloodGlucoseUnit',
]);

export const selectGraphToggles = createSelector(
  selectDashboard,
  pick([
    'showBloodGlucoseLines',
    'showBloodGlucosePoints',
    'showBloodGlucoseAfterMealPoints',
    'showBloodGlucoseBeforeMealPoints',
    'showCarbohydrates',
    'showMeanBloodGlucose',
    'showGridLines',
  ]),
);

const isNotControlMeasurement = bg => !bg.control;
const valueNotNull = bg => !isNil(bg.value);
const isValidGlucoseMeasurement = bg =>
  valueNotNull(bg) && isNotControlMeasurement(bg);

const filterByDateRange = (objects, startDate, endDate) =>
  objects.filter(({ date }) => isDateInDateRange(date, startDate, endDate));

const selectAllUnFilteredGlucoseMeasurements = createSelector(
  path(['ui', 'patientDashboard', 'glucoseMeasurements']),
  map(objectISODateToJsDateGMT),
);

const selectAllGlucoseMeasurements = createSelector(
  selectAllUnFilteredGlucoseMeasurements,
  filter(isValidGlucoseMeasurement),
);

export const selectAllGlucoseMeasurementsIncludingNullValues = createSelector(
  selectAllUnFilteredGlucoseMeasurements,
  filter(isNotControlMeasurement),
);

export const selectGlucoseMeasurementsInDateSliderRange = createSelector(
  selectAllGlucoseMeasurements,
  selectPatientStartDate,
  selectPatientEndDate,
  filterByDateRange,
);

export const selectGlucoseMeasurementsBetweenFirstAndLast = createSelector(
  selectAllGlucoseMeasurements,
  selectPatientFirstMeasurementDate,
  selectPatientLastMeasurementDate,
  filterByDateRange,
);

export const selectGlucoseMeasurementsIncludingNullValuesInDateSliderRange = createSelector(
  selectAllGlucoseMeasurementsIncludingNullValues,
  selectPatientStartDate,
  selectPatientEndDate,
  filterByDateRange,
);

const selectAllBolusesData = createSelector(
  path(['ui', 'patientDashboard', 'insulin', 'bolus']),
  map(objectISODateToJsDateGMT),
);

const selectAllBasals = createSelector(
  path(['ui', 'patientDashboard', 'insulin', 'basals']),
  compose(
    map(toBasalShape),
    map(objectISODateToJsDateGMT),
  ),
);

export const selectBolusesDataInDateSliderRange = createSelector(
  selectAllBolusesData,
  selectPatientStartDate,
  selectPatientEndDate,
  filterByDateRange,
);

export const selectBasalsInDateSliderRange = createSelector(
  selectAllBasals,
  selectPatientStartDate,
  selectPatientEndDate,
  filterByDateRange,
);

export const selectBolusesInDateSliderRange = createSelector(
  selectBolusesDataInDateSliderRange,
  createBolusObject('Bolus'),
);

export const selectBolusTotalInDateSliderRange = createSelector(
  selectBolusesDataInDateSliderRange,
  createBolusObject('BolusTotal'),
);

export const selectBolusPlusBasalTotalInDateSliderRange = createSelector(
  selectBolusesDataInDateSliderRange,
  createBolusObject('BolusPlusBasalTotal'),
);

export const selectAdvicedBolusInDateSliderRange = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  map(pick(['advicedBolus'])),
);

// High level selectors

export const selectNumberOfDaysInDateSliderRange = createSelector(
  selectPatientStartDate,
  selectPatientEndDate,
  diffInDaysInclusiveOfEnds,
);

const getPreIdealIntervalFromThreshold = propOr(null, 'preIdealInterval');
export const selectPreIdealIntervalsFromThresholds = createSelector(
  selectStripDeliveryThresholds,
  ({ actualHyper, hyper, hypo, warning }) => ({
    thresholdHyper: getPreIdealIntervalFromThreshold(actualHyper),
    upperLimit: getPreIdealIntervalFromThreshold(hyper),
    lowerLimit: getPreIdealIntervalFromThreshold(warning),
    thresholdHypo: getPreIdealIntervalFromThreshold(hypo),
  }),
);
const renameGraphsIntervalKeys = ({
  upperLimit,
  lowerLimit,
  thresholdHypo,
  thresholdHyper,
}) => ({
  upperHyperThreshold: thresholdHyper,
  glucoseIdealIntervalMax: upperLimit,
  glucoseIdealIntervalMin: lowerLimit,
  hypoglycemiaThreshold: thresholdHypo,
});

export const selectGraphThreshold = createSelector(
  selectPreIdealIntervalsFromThresholds,
  renameGraphsIntervalKeys,
);

export const selectIsFetchingPatientDateRange = path([
  'ui',
  'patientDashboard',
  'isFetchingPatientDateRange',
]);

export const selectIsLoading = createSelector(
  selectIsFetchingPatientDateRange,
  selectIsFetchingClinicalData,
  (isFetchingDateRange, isFetchingData) =>
    isFetchingDateRange || isFetchingData,
);

// TODO: Update below once local boolean values in reducer is moved to request sequence
export const selectGraphLoading = createSelector(
  selectIsFetchingPatientDateRange,
  selectIsFetchingClinicalData,
  selectIsFetchingThreshold,
  selectIsFetchingTimeIntervals,
  (
    isFetchingDateRange,
    isFetchingMeasurements,
    isFetchingThreshold,
    isFetchingTimeIntervals,
  ) =>
    isFetchingDateRange ||
    isFetchingMeasurements ||
    isFetchingThreshold ||
    isFetchingTimeIntervals,
);

const getMeasurementValues = measurements =>
  map(measurement => measurement.value, measurements);

export const selectGraphDetailTargetRanges = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectGraphThreshold,
  (bloodGlucoseMeasurements, thresholdValues) => {
    const {
      glucoseIdealIntervalMin,
      glucoseIdealIntervalMax,
      hypoglycemiaThreshold,
    } = thresholdValues;
    let aboveCount = 0;
    let belowCount = 0;
    let belowAndHypoCount = 0;
    let hypoglycaemiaCount = 0;
    let withinCount = 0;

    if (!bloodGlucoseMeasurements.length) {
      return {
        abovePercentage: EMPTY_VALUE_PLACEHOLDER,
        aboveCount: EMPTY_VALUE_PLACEHOLDER,
        belowPercentage: EMPTY_VALUE_PLACEHOLDER,
        belowCount: EMPTY_VALUE_PLACEHOLDER,
        belowAndHypoCount: EMPTY_VALUE_PLACEHOLDER,
        belowAndHypoPercentage: EMPTY_VALUE_PLACEHOLDER,
        hypoglycemiaThreshold,
        hypoglycaemiaNumber: EMPTY_VALUE_PLACEHOLDER,
        hypoglycaemiaPercentage: EMPTY_VALUE_PLACEHOLDER,
        targetBloodGlucoseMinimum: glucoseIdealIntervalMin,
        targetBloodGlucoseMaximum: glucoseIdealIntervalMax,
        withinPercentage: EMPTY_VALUE_PLACEHOLDER,
        withinCount: EMPTY_VALUE_PLACEHOLDER,
      };
    }

    getMeasurementValues(bloodGlucoseMeasurements).forEach(measurement => {
      if (!isNil(measurement)) {
        if (measurement < hypoglycemiaThreshold) {
          hypoglycaemiaCount += 1;
          belowAndHypoCount += 1;
        } else if (
          measurement >= glucoseIdealIntervalMin &&
          measurement <= glucoseIdealIntervalMax
        ) {
          withinCount += 1;
        } else if (measurement < glucoseIdealIntervalMin) {
          belowCount += 1;
          belowAndHypoCount += 1;
        } else if (measurement > glucoseIdealIntervalMax) {
          aboveCount += 1;
        }
      }
    });

    return {
      abovePercentage: fixToDecimalPlace(
        percentage(aboveCount, bloodGlucoseMeasurements.length),
        1,
      ),
      aboveCount,
      belowPercentage: fixToDecimalPlace(
        percentage(belowCount, bloodGlucoseMeasurements.length),
        1,
      ),
      belowCount,
      belowAndHypoCount,
      belowAndHypoPercentage: fixToDecimalPlace(
        percentage(belowAndHypoCount, bloodGlucoseMeasurements.length),
        1,
      ),
      hypoglycemiaThreshold,
      hypoglycaemiaNumber: Number(hypoglycaemiaCount.toFixed(1)),
      hypoglycaemiaPercentage: fixToDecimalPlace(
        percentage(hypoglycaemiaCount, bloodGlucoseMeasurements.length),
        1,
      ),
      targetBloodGlucoseMinimum: glucoseIdealIntervalMin,
      targetBloodGlucoseMaximum: glucoseIdealIntervalMax,
      withinPercentage: fixToDecimalPlace(
        percentage(withinCount, bloodGlucoseMeasurements.length),
        1,
      ),
      withinCount,
    };
  },
);

const reduceToTimeOffByDay = (timeOff, basal) => {
  const { date, basalRemark } = basal;

  let minutes;
  let base;

  if (basalRemark === BASAL_REMARKS.POWER_DOWN) {
    minutes = timeOff.minutes;
    base = date.hour * 60 + date.minute;
  } else if (
    timeOff.latestRemark === BASAL_REMARKS.POWER_DOWN &&
    basalRemark === BASAL_REMARKS.POWER_UP
  ) {
    minutes = timeOff.minutes + date.hour * 60 + date.minute - timeOff.base;
    base = timeOff.base;
  } else {
    minutes = timeOff.minutes;
    base = timeOff.base;
  }

  return {
    ...timeOff,
    minutes,
    latestRemark: basalRemark,
    base,
  };
};

const getNumBolusOfType = (bolusMeasurements, type) =>
  bolusMeasurements.filter(measurement => measurement.bolusType === type)
    .length;

export const selectTimePoweredOn = createSelector(
  selectBasalsInDateSliderRange,
  selectNumberOfDaysInDateSliderRange,
  (basals, numDays) => {
    const timePoweredOff = basals.reduce(reduceToTimeOffByDay, {
      minutes: 0,
      latestRemark: null,
      base: 0,
    });

    return MINUTES_IN_DAY * numDays - timePoweredOff.minutes;
  },
);

export const selectBolusPerDay = createSelector(
  selectBolusesInDateSliderRange,
  selectTimePoweredOn,
  (boluses, timePoweredOn) => {
    // TODO: Take into account remote bolus when finalized how to obtain such info
    const numStdBolusPerDay =
      (getNumBolusOfType(boluses, BOLUS_TYPE.STANDARD) * MINUTES_IN_DAY) /
      timePoweredOn;
    const numQuickBolusPerDay =
      (getNumBolusOfType(boluses, BOLUS_TYPE.QUICK) * MINUTES_IN_DAY) /
      timePoweredOn;
    const numExtendedBolusPerDay =
      (getNumBolusOfType(boluses, BOLUS_TYPE.EXTENDED) * MINUTES_IN_DAY) /
      timePoweredOn;
    const numMultiwaveBolusPerDay =
      (getNumBolusOfType(boluses, BOLUS_TYPE.MULTIWAVE) * MINUTES_IN_DAY) /
      timePoweredOn;

    const totalPerDay =
      numStdBolusPerDay +
      numQuickBolusPerDay +
      numExtendedBolusPerDay +
      numMultiwaveBolusPerDay;

    return {
      numStdBolusPerDay,
      numQuickBolusPerDay,
      numExtendedBolusPerDay,
      numMultiwaveBolusPerDay,
      totalPerDay,
    };
  },
);

export const selectGlucoseMeasurementsByDay = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  measurements =>
    values(
      measurements.reduce((datesGroupedByDay, val) => {
        const key = toFormat('yyyy-MM-dd')(val.date);

        const entries = datesGroupedByDay[key] || [];

        return {
          ...datesGroupedByDay,
          [key]: [...entries, val],
        };
      }, {}),
    ),
);

export const selectGlobalDatesAverageTestsPerDay = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectPatientStartDate,
  selectPatientEndDate,
  calculateIntervalAverageTestsPerDay,
);

export const selectFormattedGlobalDatesAverageTestsPerDay = createSelector(
  selectGlobalDatesAverageTestsPerDay,
  value => (value === 0 ? null : fixToDecimalPlace(value, 1)),
);
