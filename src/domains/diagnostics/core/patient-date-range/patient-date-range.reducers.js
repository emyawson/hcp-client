import { compose } from 'ramda';

import {
  subtractDays,
  toISO,
  toStartOfDay,
  toEndOfDay,
  convertISOGMT,
  convertJSDateGMT,
  convertStringToJSDate,
  isDateStringValid,
} from 'src/domains/diagnostics/utils';

import {
  FETCH_PATIENT_DATE_RANGE_REQUEST,
  PATIENT_DATE_ACTIONS,
} from './patient-date-range.constant';

export const INITIAL_PATIENT_DATE_RANGE_STATE = {
  firstMeasurementDate: null,
  lastMeasurementDate: null,
  startDate: null,
  endDate: null,
};

export const patientDateRangeReducer = (
  state = INITIAL_PATIENT_DATE_RANGE_STATE,
  action,
) => {
  switch (action.type) {
    case FETCH_PATIENT_DATE_RANGE_REQUEST.SUCCESS: {
      const latestMeasurementDate = isDateStringValid(
        action.payload.latestMeasurement,
      )
        ? convertStringToJSDate(action.payload.latestMeasurement)
        : null;
      const firstMeasurementDate = isDateStringValid(
        action.payload.firstMeasurement,
      )
        ? convertStringToJSDate(action.payload.firstMeasurement)
        : null;

      const startDate = compose(
        toISO,
        toStartOfDay,
        subtractDays(13),
        convertJSDateGMT,
      )(latestMeasurementDate || new Date());

      const endDate = compose(
        toISO,
        toEndOfDay,
        convertJSDateGMT,
      )(latestMeasurementDate || new Date());

      return {
        ...state,
        firstMeasurementDate: compose(
          toISO,
          convertJSDateGMT,
        )(firstMeasurementDate),
        lastMeasurementDate: compose(
          toISO,
          convertJSDateGMT,
        )(latestMeasurementDate),
        startDate,
        endDate,
      };
    }
    case PATIENT_DATE_ACTIONS.CLEAR: {
      return INITIAL_PATIENT_DATE_RANGE_STATE;
    }
    case PATIENT_DATE_ACTIONS.SET_DATES: {
      return {
        ...state,
        startDate: compose(
          toISO,
          toStartOfDay,
          convertISOGMT,
        )(action.payload.startDate),
        endDate: compose(
          toISO,
          toEndOfDay,
          convertISOGMT,
        )(action.payload.endDate),
      };
    }
    default:
      return state;
  }
};
