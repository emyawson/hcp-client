import { createRequestActions } from 'src/domains/diagnostics/core/request';

import {
  GET_CLINICAL_DATA_REQUEST,
  PATIENT_DASHBOARD_ACTIONS,
} from './constants';

export const changeGraph = graph => ({
  type: PATIENT_DASHBOARD_ACTIONS.CHANGE_GRAPH,
  payload: graph,
});

export const onBloodGlucoseOverviewEndDateChange = endDate => ({
  type: PATIENT_DASHBOARD_ACTIONS.SET_BLOOD_GLUCOSE_OVERVIEW_END_DATE,
  payload: { endDate },
});

export const changeGraphStartTime = graphStartTime => ({
  type: PATIENT_DASHBOARD_ACTIONS.CHANGE_GRAPH_START_TIME,
  payload: graphStartTime,
});

export const changeGraphType = graphType => ({
  type: PATIENT_DASHBOARD_ACTIONS.CHANGE_GRAPH_TYPE,
  payload: graphType,
});

export const changeLogbookType = logbookType => ({
  type: PATIENT_DASHBOARD_ACTIONS.CHANGE_LOGBOOK_TYPE,
  payload: logbookType,
});

export const getClinicalData = createRequestActions(GET_CLINICAL_DATA_REQUEST);

export const setClinicalData = (measurements, insulin) => ({
  type: PATIENT_DASHBOARD_ACTIONS.SET_CLINICAL_DATA,
  payload: { measurements, insulin },
});

export const toggleBloodGlucoseLines = () => ({
  type: PATIENT_DASHBOARD_ACTIONS.TOGGLE_BLOOD_GLUCOSE_LINES,
});

export const toggleBloodGlucosePoints = () => ({
  type: PATIENT_DASHBOARD_ACTIONS.TOGGLE_BLOOD_GLUCOSE_POINTS,
});

export const toggleBloodGlucoseBeforeMealPoints = () => ({
  type: PATIENT_DASHBOARD_ACTIONS.TOGGLE_BLOOD_GLUCOSE_BEFORE_MEAL_POINTS,
});

export const toggleBloodGlucoseAfterMealPoints = () => ({
  type: PATIENT_DASHBOARD_ACTIONS.TOGGLE_BLOOD_GLUCOSE_AFTER_MEAL_POINTS,
});
export const toggleCarbohydrates = () => ({
  type: PATIENT_DASHBOARD_ACTIONS.TOGGLE_CARBOHYDRATES,
});
export const toggleMeanBloodGlucose = () => ({
  type: PATIENT_DASHBOARD_ACTIONS.TOGGLE_MEAN_BLOOD_GLUCOSE,
});
