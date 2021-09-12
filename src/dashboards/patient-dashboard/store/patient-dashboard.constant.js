import { createRequestActionTypes } from 'src/core/request';

export const PATIENT_DASHBOARD_ACTIONS = {
  CHANGE_GRAPH: 'CHANGE_GRAPH',
  CHANGE_GRAPH_TYPE: 'CHANGE_GRAPH_TYPE',
  CHANGE_LOGBOOK_TYPE: 'CHANGE_LOGBOOK_TYPE',
  SET_DATES: 'SET_DATES',
  SET_BLOOD_GLUCOSE_OVERVIEW_END_DATE: 'SET_BLOOD_GLUCOSE_OVERVIEW_END_DATE',
  SET_CLINICAL_DATA: 'SET_CLINICAL_DATA',
  TOGGLE_BLOOD_GLUCOSE_LINES: 'TOGGLE_BLOOD_GLUCOSE_LINES',
  TOGGLE_BLOOD_GLUCOSE_POINTS: 'TOGGLE_BLOOD_GLUCOSE_POINTS',
  TOGGLE_BLOOD_GLUCOSE_BEFORE_MEAL_POINTS:
    'TOGGLE_BLOOD_GLUCOSE_BEFORE_MEAL_POINTS',
  TOGGLE_BLOOD_GLUCOSE_AFTER_MEAL_POINTS:
    'TOGGLE_BLOOD_GLUCOSE_AFTER_MEAL_POINTS',
  TOGGLE_CARBOHYDRATES: 'TOGGLE_CARBOHYDRATES',
  TOGGLE_MEAN_BLOOD_GLUCOSE: 'TOGGLE_MEAN_BLOOD_GLUCOSE',
  TOGGLE_DTC_MODAL: 'TOGGLE_DTC_MODAL',
};

export const GET_PATIENT = 'GET_PATIENT';
export const GET_PATIENT_REQUEST = createRequestActionTypes(GET_PATIENT);

const GET_CLINICAL_DATA = 'GET_CLINICAL_DATA';
export const GET_CLINICAL_DATA_REQUEST = createRequestActionTypes(
  GET_CLINICAL_DATA,
);

export const GRAPH_TYPE = {
  TREND: 'trend',
  STANDARD_DAY: 'standard-day',
  STANDARD_WEEK: 'standard-week',
  LOGBOOK: 'logbook',
  METABOLIC_RATE: 'metabolic-rate',
  INSULIN: 'insulin',
  INSULIN_PUMP: 'insulin-pump',
};

export const BLOOD_GLUCOSE_UNITS = {
  MG_PER_DL: 'mg/dL',
};
