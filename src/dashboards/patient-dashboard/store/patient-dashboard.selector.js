import { createSelector, createStructuredSelector } from 'reselect';
import { pick, pipe, values, any } from 'ramda';

import { getCombinedRoutes } from 'src/navigation';
import {
  selectPatientStartDate,
  selectPatientEndDate,
} from 'src/core/patient-date-range';
import { selectPatient } from 'src/core/patient';
import {
  selectDashboard,
  selectGraph,
  selectGraphType,
  selectLogbookType,
} from 'src/core/diagnostics';

export const selectIsFetchingData = createSelector(
  selectDashboard,
  pipe(
    pick([
      'isFetchingPatientDateRange',
      'isFetchingClinicalData',
      'isFetchingTimeIntervals',
      'isFetchingPatient',
      'isFetchingStripDeliveryInfo',
      'isFetchingThreshold',
    ]),
    values,
    any(value => value === true),
  ),
);

export const patientDashboardConnector = createStructuredSelector({
  patient: selectPatient,
  graph: selectGraph,
  graphType: selectGraphType,
  logbookType: selectLogbookType,
  isFetchingData: selectIsFetchingData,
  startDate: selectPatientStartDate,
  endDate: selectPatientEndDate,
  routes: getCombinedRoutes,
});
