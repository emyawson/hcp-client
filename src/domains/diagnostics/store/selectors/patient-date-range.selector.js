import { path } from 'ramda';
import { createSelector } from 'reselect';

import { convertISOToJsGMT } from 'src/domains/diagnostics/utils';

export const selectPatientStartDate = createSelector(
  path(['ui', 'patientDateRange', 'startDate']),
  convertISOToJsGMT,
);

export const selectPatientEndDate = createSelector(
  path(['ui', 'patientDateRange', 'endDate']),
  convertISOToJsGMT,
);
export const selectPatientFirstMeasurementDate = createSelector(
  path(['ui', 'patientDateRange', 'firstMeasurementDate']),
  convertISOToJsGMT,
);

export const selectPatientLastMeasurementDate = createSelector(
  path(['ui', 'patientDateRange', 'lastMeasurementDate']),
  convertISOToJsGMT,
);
