import {
  FETCH_PATIENT_DATE_RANGE_REQUEST,
  selectPatientStartDate,
  selectPatientEndDate,
} from 'src/core';

import { GET_CLINICAL_DATA_REQUEST } from './patient-dashboard.constant';
import { getClinicalData, setClinicalData } from './patient-dashboard.action';

import { requestSequence } from '../../../core/request';

export const getClinicalDataEpic = clinicalDataService =>
  requestSequence({
    service: clinicalDataService,
    actionTypes: GET_CLINICAL_DATA_REQUEST,
  });

export const setClinicalDataEpic = () => (action$: any, store: any) =>
  action$.ofType(GET_CLINICAL_DATA_REQUEST.SUCCESS).flatMap(action => {
    const { measurements, insulin } = action.payload;
    return [setClinicalData(measurements, insulin)];
  });

export const getClinicalDataOnDateRangeEpic = () => (
  action$: any,
  store: any,
) =>
  action$.ofType(FETCH_PATIENT_DATE_RANGE_REQUEST.SUCCESS).flatMap(action => {
    const state = store.getState();
    const startDate = selectPatientStartDate(state);
    const endDate = selectPatientEndDate(state);
    const { patientId } = action.payload;
    return [getClinicalData.start({ patientId, startDate, endDate })];
  });
