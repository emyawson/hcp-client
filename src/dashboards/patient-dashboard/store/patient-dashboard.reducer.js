import { STATE_ACTIONS, FETCH_PATIENT_DATE_RANGE_REQUEST } from 'src/core';

import {
  BLOOD_GLUCOSE_UNITS,
  PATIENT_DASHBOARD_ACTIONS,
  GET_CLINICAL_DATA_REQUEST,
} from './patient-dashboard.constant';

import { TIME_INTERVAL } from '../../../domains/diagnostics/constants/diagnostics.constants';

export const INITIAL_PATIENT_DASHBOARD_STATE = {
  bgOverview: {
    timeInterval: TIME_INTERVAL.WEEKLY_INTERVALS, // Update default to UPLOAD_DATE when available
    endDate: null,
  },
  bloodGlucoseUnit: BLOOD_GLUCOSE_UNITS.MG_PER_DL,
  glucoseMeasurements: [],
  graph: 'standard-day',
  graphStartTime: '0:00',
  graphType: 'details',
  logbookType: 'details',
  insulin: { basals: [], bolus: [] },
  isFetchingClinicalData: false,
  isFetchingPatient: false,
  isFetchingPatientDateRange: false,
  isFetchingStripDeliveryInfo: false,
  isFetchingThreshold: false,
  isFetchingTimeIntervals: false,
  showBloodGlucoseAfterMealPoints: true,
  showBloodGlucoseBeforeMealPoints: true,
  showBloodGlucoseLines: true,
  showBloodGlucosePoints: true,
  showGridLines: true,
  showCarbohydrates: false,
  showMeanBloodGlucose: true,
};

export const patientDashboardReducer = (
  state = INITIAL_PATIENT_DASHBOARD_STATE,
  action,
) => {
  switch (action.type) {
    case FETCH_PATIENT_DATE_RANGE_REQUEST.START: {
      return {
        ...state,
        isFetchingPatientDateRange: true,
      };
    }
    case FETCH_PATIENT_DATE_RANGE_REQUEST.ERROR: {
      return {
        ...state,
        isFetchingPatientDateRange: false,
      };
    }
    case FETCH_PATIENT_DATE_RANGE_REQUEST.SUCCESS: {
      const { bgOverview } = state;
      return {
        ...state,
        isFetchingPatientDateRange: false,
        bgOverview: {
          ...bgOverview,
          endDate: action.payload.latestMeasurement,
        },
      };
    }
    case STATE_ACTIONS.CLEAR_PATIENT_DASHBOARD:
      return INITIAL_PATIENT_DASHBOARD_STATE;
    case PATIENT_DASHBOARD_ACTIONS.CHANGE_GRAPH: {
      return {
        ...state,
        graph: action.payload,
      };
    }
    case PATIENT_DASHBOARD_ACTIONS.CHANGE_GRAPH_TYPE: {
      return {
        ...state,
        graphType: action.payload,
      };
    }
    case PATIENT_DASHBOARD_ACTIONS.CHANGE_LOGBOOK_TYPE: {
      return {
        ...state,
        logbookType: action.payload,
      };
    }
    case PATIENT_DASHBOARD_ACTIONS.SET_BLOOD_GLUCOSE_OVERVIEW_END_DATE: {
      const { bgOverview } = state;
      return {
        ...state,
        bgOverview: {
          ...bgOverview,
          endDate: action.payload.endDate,
        },
      };
    }
    case GET_CLINICAL_DATA_REQUEST.START: {
      return {
        ...state,
        isFetchingClinicalData: true,
      };
    }
    case GET_CLINICAL_DATA_REQUEST.SUCCESS: {
      return {
        ...state,
        isFetchingClinicalData: false,
      };
    }
    case GET_CLINICAL_DATA_REQUEST.ERROR: {
      return {
        ...state,
        isFetchingClinicalData: false,
      };
    }
    case PATIENT_DASHBOARD_ACTIONS.SET_CLINICAL_DATA: {
      return {
        ...state,
        glucoseMeasurements: action.payload.measurements,
        insulin: action.payload.insulin,
      };
    }
    case PATIENT_DASHBOARD_ACTIONS.TOGGLE_BLOOD_GLUCOSE_LINES: {
      return {
        ...state,
        showBloodGlucoseLines: !state.showBloodGlucoseLines,
      };
    }
    case PATIENT_DASHBOARD_ACTIONS.TOGGLE_BLOOD_GLUCOSE_POINTS: {
      return {
        ...state,
        showBloodGlucosePoints: !state.showBloodGlucosePoints,
      };
    }
    case PATIENT_DASHBOARD_ACTIONS.TOGGLE_BLOOD_GLUCOSE_BEFORE_MEAL_POINTS: {
      return {
        ...state,
        showBloodGlucoseBeforeMealPoints: !state.showBloodGlucoseBeforeMealPoints,
      };
    }
    case PATIENT_DASHBOARD_ACTIONS.TOGGLE_BLOOD_GLUCOSE_AFTER_MEAL_POINTS: {
      return {
        ...state,
        showBloodGlucoseAfterMealPoints: !state.showBloodGlucoseAfterMealPoints,
      };
    }
    case PATIENT_DASHBOARD_ACTIONS.TOGGLE_CARBOHYDRATES: {
      return {
        ...state,
        showCarbohydrates: !state.showCarbohydrates,
      };
    }
    case PATIENT_DASHBOARD_ACTIONS.TOGGLE_MEAN_BLOOD_GLUCOSE: {
      return {
        ...state,
        showMeanBloodGlucose: !state.showMeanBloodGlucose,
      };
    }
    default:
      return state;
  }
};
