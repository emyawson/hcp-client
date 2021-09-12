import { addDomainNamespace } from 'src/utils';

import { createRequestActionTypes } from '../request/request.actions';

export const therapyTranslationKeyBase = 'prescription.therapy.';
export const frequencyTranslationKeyBase = 'prescription.frequency.';
export const clinicGuideTranslationKeyBase = 'prescription.clinicGuide.';
export const stripModelTranslationKeyBase = 'prescription.stripModel.';
export const periodTranslationKeyBase = 'prescription.period.';

const DOMAIN_NAMESPACE = 'PATIENT_PRESCRIPTION';
const addNamespacing = actionName =>
  addDomainNamespace(actionName, DOMAIN_NAMESPACE);

export const PRESCRIPTION_ACTIONS = {
  GET_PRESCRIPTION: addNamespacing('GET_PRESCRIPTION'),
  SET_PRESCRIPTION: addNamespacing('SET_PRESCRIPTION'),
  SET_ACTIVE_PRESCRIPTION_FORM: addNamespacing('SET_ACTIVE_PRESCRIPTION_FORM'),
  ADD_PRESCRIPTION_ENTRY: addNamespacing('ADD_PRESCRIPTION_ENTRY'),
  CREATE_PRESCRIPTION_ENTRY: addNamespacing('CREATE_PRESCRIPTION_ENTRY'),
  UPDATE_QUANTITIES_AND_PERIODS: addNamespacing(
    'UPDATE_QUANTITIES_AND_PERIODS',
  ),
  RESET_PRESCRIPTION: addNamespacing('RESET_PRESCRIPTION'),
  INITIALIZE_PRESCRIPTION: addNamespacing('INITIALIZE_PRESCRIPTION'),
  SET_PRESCRIPTION_CLINIC_GUIDE_TYPE: addNamespacing(
    'SET_PRESCRIPTION_CLINIC_GUIDE_TYPE',
  ),
  REMOVE_UNSAVED_PRESCRIPTION: addNamespacing('REMOVE_UNSAVED_PRESCRIPTION'),
  SHOW_CUSTOM_CLINIC_GUIDES_FORM: addNamespacing(
    'SHOW_CUSTOM_CLINIC_GUIDES_FORM',
  ),
  HIDE_CUSTOM_CLINIC_GUIDES_FORM: addNamespacing(
    'HIDE_CUSTOM_CLINIC_GUIDES_FORM',
  ),
  SET_CLINIC_GUIDE_FILTER: addNamespacing('SET_CLINIC_GUIDE_FILTER'),
  SET_GUIDE_HISTORY_FILTER: addNamespacing('SET_GUIDE_HISTORY_FILTER'),
  SET_GUIDE_HISTORY_PAGE: addNamespacing('SET_GUIDE_HISTORY_PAGE'),
};

export const PATIENT_PRESCRIPTION_TYPES = {
  TEMPORARY: 'temporary',
  PERMANENT: 'permanent',
};

export const UNSAVED_PRESCRIPTION_IDS = {
  TEMPORARY: 'new-unsaved-temporary-prescription',
  PERMANENT: 'new-unsaved-permanent-prescription',
};

export const FLATTENED_UNSAVED_PRESCRIPTION_IDS = [
  UNSAVED_PRESCRIPTION_IDS.PERMANENT,
  UNSAVED_PRESCRIPTION_IDS.TEMPORARY,
];

export const GET_THERAPIES = addNamespacing('GET_THERAPIES');
export const GET_THERAPIES_REQUEST = createRequestActionTypes(GET_THERAPIES);

export const GET_CLINIC_GUIDES = addNamespacing('GET_CLINIC_GUIDES');
export const GET_CLINIC_GUIDES_REQUEST = createRequestActionTypes(
  GET_CLINIC_GUIDES,
);

export const SAVE_CLINIC_GUIDE = addNamespacing('SAVE_CLINIC_GUIDE');
export const SAVE_CLINIC_GUIDE_REQUEST = createRequestActionTypes(
  SAVE_CLINIC_GUIDE,
);

export const DELETE_CLINIC_GUIDE = addNamespacing('DELETE_CLINIC_GUIDE');
export const DELETE_CLINIC_GUIDE_REQUEST = createRequestActionTypes(
  DELETE_CLINIC_GUIDE,
);

export const GET_FREQUENCIES = addNamespacing('GET_FREQUENCIES');
export const GET_FREQUENCIES_REQUEST = createRequestActionTypes(
  GET_FREQUENCIES,
);

export const GET_STRIP_MODELS = addNamespacing('GET_STRIP_MODELS');
export const GET_STRIP_MODELS_REQUEST = createRequestActionTypes(
  GET_STRIP_MODELS,
);

export const GET_CURRENT_PRESCRIPTION = addNamespacing(
  'GET_CURRENT_PRESCRIPTION',
);
export const GET_CURRENT_PRESCRIPTION_REQUEST = createRequestActionTypes(
  GET_CURRENT_PRESCRIPTION,
);

export const SAVE_PRESCRIPTION = addNamespacing('SAVE_PRESCRIPTION');
export const SAVE_PRESCRIPTION_REQUEST = createRequestActionTypes(
  SAVE_PRESCRIPTION,
);

export const FETCH_TEMPORARY_REASONS = addNamespacing(
  'FETCH_TEMPORARY_REASONS',
);
export const FETCH_TEMPORARY_REASONS_REQUEST = createRequestActionTypes(
  FETCH_TEMPORARY_REASONS,
);

export const TEMPORARY_PRESCRIPTION_ID = 'temporaryPrescription';

// User modifiable fields to reset on SET_ACTIVE_PRESCRIPTION_FORM
const USER_EDITABLE_FIELDS = [
  'clinicGuide',
  'frequency',
  'period',
  'quantity',
  'stripModel',
  'therapy',
];

export const HYDRATED_FORM_VALUES = [
  ...USER_EDITABLE_FIELDS,
  'id',
  'prescriptionType',
];

export const MAX_PRESCRIPTIONS = 2;

export const CLINIC_GUIDE_TYPES = {
  CUSTOM: 'CUSTOM',
  PRESET: 'PRESET',
};

export const GUIDE_HISTORY_FILTERS = {
  ALL: 'ALL',
  PERSONAL: 'PERSONAL',
};

export const GUIDES_PER_HISTORY_PAGE = 5;
