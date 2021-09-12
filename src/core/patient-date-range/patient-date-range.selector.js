import { path } from 'ramda';

export const selectPatientStartDate = path([
  'ui',
  'patientDateRange',
  'startDate',
]);

export const selectPatientEndDate = path(['ui', 'patientDateRange', 'endDate']);

export const selectPatientFirstMeasurementDate = path([
  'ui',
  'patientDateRange',
  'firstMeasurementDate',
]);

export const selectPatientLastMeasurementDate = path([
  'ui',
  'patientDateRange',
  'lastMeasurementDate',
]);
