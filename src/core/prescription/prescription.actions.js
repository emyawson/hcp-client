import { createRequestActions } from 'src/core';

import {
  PRESCRIPTION_ACTIONS,
  GET_THERAPIES_REQUEST,
  GET_CLINIC_GUIDES_REQUEST,
  GET_FREQUENCIES_REQUEST,
  GET_STRIP_MODELS_REQUEST,
  GET_CURRENT_PRESCRIPTION_REQUEST,
  SAVE_PRESCRIPTION_REQUEST,
  FETCH_TEMPORARY_REASONS_REQUEST,
  SAVE_CLINIC_GUIDE_REQUEST,
  DELETE_CLINIC_GUIDE_REQUEST,
} from './prescription.constants';

export const resetPrescription = id => ({
  type: PRESCRIPTION_ACTIONS.RESET_PRESCRIPTION,
});

export const addPrescriptionEntry = id => ({
  type: PRESCRIPTION_ACTIONS.ADD_PRESCRIPTION_ENTRY,
  payload: id,
});

export const createPrescriptionEntry = () => ({
  type: PRESCRIPTION_ACTIONS.CREATE_PRESCRIPTION_ENTRY,
});

export const setPrescription = prescription => ({
  type: PRESCRIPTION_ACTIONS.SET_PRESCRIPTION,
  payload: prescription,
});

export const setActivePrescriptionForm = formId => ({
  type: PRESCRIPTION_ACTIONS.SET_ACTIVE_PRESCRIPTION_FORM,
  payload: formId,
});

// Quantities and periods directly extracted from clinic guide
export const updateQuantitiesAndPeriods = ({ formId, clinicGuideId }) => ({
  type: PRESCRIPTION_ACTIONS.UPDATE_QUANTITIES_AND_PERIODS,
  payload: { formId, clinicGuideId },
});

export const removeUnsavedPrescription = formId => ({
  type: PRESCRIPTION_ACTIONS.REMOVE_UNSAVED_PRESCRIPTION,
  payload: formId,
});

export const setClinicGuideFilter = ({ formId, filter }) => ({
  type: PRESCRIPTION_ACTIONS.SET_CLINIC_GUIDE_FILTER,
  payload: { formId, filter },
});

export const setGuideHistoryFilter = ({ filter }) => ({
  type: PRESCRIPTION_ACTIONS.SET_GUIDE_HISTORY_FILTER,
  payload: { filter },
});

export const setGuideHistoryPage = ({ page }) => ({
  type: PRESCRIPTION_ACTIONS.SET_GUIDE_HISTORY_PAGE,
  payload: { page },
});

export const getTherapiesRequest = createRequestActions(GET_THERAPIES_REQUEST);

export const getClinicGuidesRequest = createRequestActions(
  GET_CLINIC_GUIDES_REQUEST,
);

export const getFrequenciesRequest = createRequestActions(
  GET_FREQUENCIES_REQUEST,
);

export const getStripModelsRequest = createRequestActions(
  GET_STRIP_MODELS_REQUEST,
);

export const getCurrentPrescriptionRequest = createRequestActions(
  GET_CURRENT_PRESCRIPTION_REQUEST,
);

export const savePrescriptionRequest = createRequestActions(
  SAVE_PRESCRIPTION_REQUEST,
);

export const fetchTemporaryReasonsRequest = createRequestActions(
  FETCH_TEMPORARY_REASONS_REQUEST,
);

export const saveClinicGuideRequest = createRequestActions(
  SAVE_CLINIC_GUIDE_REQUEST,
);

export const deleteClinicGuideRequest = createRequestActions(
  DELETE_CLINIC_GUIDE_REQUEST,
);

export const initializePrescription = fieldData => ({
  type: PRESCRIPTION_ACTIONS.INITIALIZE_PRESCRIPTION,
  payload: fieldData,
});

export const setPrescriptionClinicGuideType = ({ id, isCustom }) => ({
  type: PRESCRIPTION_ACTIONS.SET_PRESCRIPTION_CLINIC_GUIDE_TYPE,
  payload: { id, isCustom },
});

export const showCustomClinicGuidesForm = () => ({
  type: PRESCRIPTION_ACTIONS.SHOW_CUSTOM_CLINIC_GUIDES_FORM,
});

export const hideCustomClinicGuidesForm = () => ({
  type: PRESCRIPTION_ACTIONS.HIDE_CUSTOM_CLINIC_GUIDES_FORM,
});
