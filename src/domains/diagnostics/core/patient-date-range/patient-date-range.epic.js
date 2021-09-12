import { path } from 'ramda';

import { hasValue } from 'src/domains/diagnostics/utils';
import { requestSequence } from 'src/domains/diagnostics/core/request';
import { getClinicalData } from 'src/domains/diagnostics/store/actions';

import {
  selectPatientStartDate,
  selectPatientEndDate,
} from './patient-date-range.selector';
import {
  FETCH_PATIENT_DATE_RANGE_REQUEST,
  PATIENT_DATE_ACTIONS,
} from './patient-date-range.constant';

export const fetchPatientDateRangeEpic = fetchDateRangeService =>
  requestSequence({
    service: fetchDateRangeService,
    actionTypes: FETCH_PATIENT_DATE_RANGE_REQUEST,
    invokeWhen: state =>
      !hasValue(
        path(['ui', 'patientDateRange', 'firstMeasurementDate'])(state),
      ),
  });

export const getClinicalDataOnDatesChangeEpic = () => (action$, store) =>
  action$.ofType(PATIENT_DATE_ACTIONS.SET_DATES).mergeMap(action => {
    const state = store.getState();
    const startDate = selectPatientStartDate(state);
    const endDate = selectPatientEndDate(state);
    const { patientId } = action.payload;
    return [getClinicalData(patientId, startDate, endDate)];
  });
