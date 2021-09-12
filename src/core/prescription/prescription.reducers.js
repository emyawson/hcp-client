import { find, propEq, pathOr, pipe, path } from 'ramda';

import { STATE_ACTIONS } from 'src/core';
import { isNotNil } from 'src/utils/validation-helpers';

import {
  PRESCRIPTION_ACTIONS,
  GET_THERAPIES_REQUEST,
  GET_CLINIC_GUIDES_REQUEST,
  GET_FREQUENCIES_REQUEST,
  GET_STRIP_MODELS_REQUEST,
  SAVE_PRESCRIPTION_REQUEST,
  FETCH_TEMPORARY_REASONS_REQUEST,
  GET_CURRENT_PRESCRIPTION_REQUEST,
  CLINIC_GUIDE_TYPES,
  GUIDE_HISTORY_FILTERS,
} from './prescription.constants';
import {
  flattenPrescriptions,
  clinicGuideToQuantities,
  findClinicGuideWithClinicGuideId,
  setAllFieldsOptions,
  setFieldOptions,
  setFieldOptionsForTemporaryForm,
  removeActiveForm,
  clinicGuideToPeriods,
  removePrescription,
  setPrescriptionByType,
} from './prescription.utils';

// .prescriptions: saved prescriptions fetched from middleware
// .activeForms: the working copies modified by the user
// .activeFormId: the current form being edited by user
export const INITIAL_PRESCRIPTION_STATE = {
  activeFormId: '',
  activeForms: {},
  permanent: null,
  temporary: null,
  activePrescription: null,
  stripModels: [],
  frequencies: [],
  therapies: [],
  clinicGuides: [],
  isCreatingCustomClinicGuides: false,
  guideHistoryFilter: GUIDE_HISTORY_FILTERS.ALL,
  guideHistoryPage: 1,
};

// Arrays represent dropdown options fetched from middleware
// Their respective single values represent user's choice from the list
export const INITIAL_PRESCRIPTION_FORM_STATE = {
  clinicGuide: '',
  quantity: null,
  stripModel: '',
  therapy: '',
  frequency: '',
  period: '',
  reason: null,
  startDate: null,
  endDate: null,
  clinicGuideFilter: null,
};

export const INITIAL_TEMPORARY_PRESCRIPTION_FORM_STATE = {
  ...INITIAL_PRESCRIPTION_FORM_STATE,
  reason: '',
};

// Check if this prescription already exists in the store
const isNewPrescription = (id, prescriptions) =>
  !find(propEq('id', id))(prescriptions);

export const prescriptionReducer = (
  state = INITIAL_PRESCRIPTION_STATE,
  action,
) => {
  switch (action.type) {
    case STATE_ACTIONS.CLEAR_PRESCRIPTIONS:
      return INITIAL_PRESCRIPTION_STATE;
    case PRESCRIPTION_ACTIONS.RESET_PRESCRIPTION: {
      return {
        ...INITIAL_PRESCRIPTION_STATE,
        stripModels: state.stripModels,
      };
    }
    case GET_CURRENT_PRESCRIPTION_REQUEST.SUCCESS: {
      return {
        ...state,
        activePrescription: pathOr(null, ['payload', 'active'])(action),
      };
    }
    case PRESCRIPTION_ACTIONS.ADD_PRESCRIPTION_ENTRY: {
      // Create a new prescription object and insert it into the store
      // (in prescriptions array and empty object entry in activeForms)
      // This will render a new form on the front end
      // Temporary prescription will not persist unless saved
      const nextPrescriptionId = action.payload.id;
      const prescriptions = flattenPrescriptions({
        permanent: state.permanent,
        temporary: state.temporary,
      });

      if (isNewPrescription(nextPrescriptionId, prescriptions)) {
        const nextPrescription = action.payload;
        return pipe(
          setPrescriptionByType(nextPrescription),
          setAllFieldsOptions(nextPrescriptionId, {
            id: nextPrescriptionId,
            clinicGuideFilter: CLINIC_GUIDE_TYPES.PRESET,
          }),
        )(state);
      }
      return state;
    }
    case PRESCRIPTION_ACTIONS.SET_ACTIVE_PRESCRIPTION_FORM: {
      // Display the form matching a prescription ID and restore to saved state
      const activeFormId = action.payload;
      return {
        ...state,
        activeFormId,
      };
    }
    case GET_STRIP_MODELS_REQUEST.SUCCESS: {
      return {
        ...state,
        stripModels: action.payload,
      };
    }
    case GET_THERAPIES_REQUEST.SUCCESS: {
      const therapies = action.payload;
      return {
        ...state,
        therapies,
      };
    }
    case GET_CLINIC_GUIDES_REQUEST.SUCCESS: {
      const { clinicGuides, id } = action.payload;

      // TODO: move off storing guides by active form and clean this up
      if (isNotNil(id)) {
        const prescriptions = flattenPrescriptions({
          permanent: state.permanent,
          temporary: state.temporary,
        });
        const clinicGuideFilter =
          pipe(
            find(propEq('id', id)),
            path(['clinicGuide']),
            clinicGuideId => find(propEq('id', clinicGuideId), clinicGuides),
            path(['type']),
          )(prescriptions) || CLINIC_GUIDE_TYPES.PRESET;

        return {
          ...setAllFieldsOptions(id, {
            clinicGuides: clinicGuides,
            clinicGuideFilter,
          })(state),
          clinicGuides,
        };
      }

      return {
        ...state,
        clinicGuides,
      };
    }
    case GET_FREQUENCIES_REQUEST.SUCCESS: {
      const frequencies = action.payload;
      return {
        ...state,
        frequencies,
      };
    }
    case FETCH_TEMPORARY_REASONS_REQUEST.SUCCESS: {
      const reasons = action.payload;
      return setFieldOptionsForTemporaryForm('reasons', reasons)(state);
    }
    case SAVE_PRESCRIPTION_REQUEST.SUCCESS: {
      // After save, remove the working prescription object
      // Latest valid prescriptions will be fetched from API and injected
      const previousId = action.payload.previousPrescriptionId;
      return removeActiveForm(previousId)(state);
    }
    case PRESCRIPTION_ACTIONS.UPDATE_QUANTITIES_AND_PERIODS: {
      const { clinicGuideId, formId } = action.payload;
      const clinicGuide = pipe(
        pathOr([], ['activeForms', formId, 'clinicGuides']),
        findClinicGuideWithClinicGuideId(clinicGuideId),
      )(state);
      const quantities = clinicGuideToQuantities(clinicGuide);
      const periods = clinicGuideToPeriods(clinicGuide);
      return pipe(
        setFieldOptions('quantities', quantities, formId),
        setFieldOptions('periods', periods, formId),
      )(state);
    }
    case PRESCRIPTION_ACTIONS.SET_PRESCRIPTION_CLINIC_GUIDE_TYPE: {
      const { id, isCustom } = action.payload;
      return pipe(setFieldOptions('hasCustomClinicGuide', isCustom, id))(state);
    }
    case PRESCRIPTION_ACTIONS.REMOVE_UNSAVED_PRESCRIPTION: {
      const formId = action.payload;
      return pipe(
        removePrescription(formId),
        removeActiveForm(formId),
      )(state);
    }
    case PRESCRIPTION_ACTIONS.SHOW_CUSTOM_CLINIC_GUIDES_FORM: {
      return {
        ...state,
        isCreatingCustomClinicGuides: true,
      };
    }
    case PRESCRIPTION_ACTIONS.HIDE_CUSTOM_CLINIC_GUIDES_FORM: {
      return {
        ...state,
        isCreatingCustomClinicGuides: false,
      };
    }
    case PRESCRIPTION_ACTIONS.SET_CLINIC_GUIDE_FILTER: {
      const { filter, formId } = action.payload;
      return setFieldOptions('clinicGuideFilter', filter, formId)(state);
    }
    case PRESCRIPTION_ACTIONS.SET_GUIDE_HISTORY_FILTER: {
      const { filter } = action.payload;
      return {
        ...state,
        guideHistoryFilter: filter,
      };
    }
    case PRESCRIPTION_ACTIONS.SET_GUIDE_HISTORY_PAGE: {
      const { page } = action.payload;
      return {
        ...state,
        guideHistoryPage: page,
      };
    }
    default:
      return state;
  }
};
