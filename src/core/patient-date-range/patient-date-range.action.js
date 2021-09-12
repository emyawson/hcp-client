import { createRequestActions } from 'src/core/request';

import {
  FETCH_PATIENT_DATE_RANGE_REQUEST,
  PATIENT_DATE_ACTIONS,
} from './patient-date-range.constant';

export const fetchPatientDateRangeRequest = createRequestActions(
  FETCH_PATIENT_DATE_RANGE_REQUEST,
);

export const clearPatientDateRange = () => ({
  type: PATIENT_DATE_ACTIONS.CLEAR,
});

export const onPatientDatesRangeChange = (patientId, startDate, endDate) => ({
  type: PATIENT_DATE_ACTIONS.SET_DATES,
  payload: { patientId, startDate, endDate },
});
