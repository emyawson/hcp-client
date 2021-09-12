import { createSelector } from 'reselect';
import { path, filter } from 'ramda';

export const selectBGOverviewTimeInterval = path([
  'ui',
  'patientDashboard',
  'bgOverview',
  'timeInterval',
]);

export const selectBGOverviewEndDate = path([
  'ui',
  'patientDashboard',
  'bgOverview',
  'endDate',
]);

export const selectDashboard = path(['ui', 'patientDashboard']);
export const selectGraph = path(['ui', 'patientDashboard', 'graph']);
export const selectGraphType = path(['ui', 'patientDashboard', 'graphType']);
export const selectLogbookType = path([
  'ui',
  'patientDashboard',
  'logbookType',
]);

const selectRawGlucoseMeasurements = path([
  'ui',
  'patientDashboard',
  'glucoseMeasurements',
]);

const isNotControlMeasurement = bg => !bg.control;
const isGlucoseMeasurement = bg =>
  bg.value != null && isNotControlMeasurement(bg);

export const selectAllGlucoseMeasurements = createSelector(
  selectRawGlucoseMeasurements,
  filter(isGlucoseMeasurement),
);

export const selectAllGlucoseMeasurementsIncludingNullValues = createSelector(
  selectRawGlucoseMeasurements,
  filter(isNotControlMeasurement),
);

export const selectGraphStartTime = path([
  'ui',
  'patientDashboard',
  'graphStartTime',
]);

export const selectAllInsulin = path(['ui', 'patientDashboard', 'insulin']);

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

export const selectAllBolusesData = path([
  'ui',
  'patientDashboard',
  'insulin',
  'bolus',
]);

export const selectAllBasals = path([
  'ui',
  'patientDashboard',
  'insulin',
  'basals',
]);
