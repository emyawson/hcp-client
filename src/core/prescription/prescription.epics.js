import {
  pathOr,
  pipe,
  map,
  equals,
  isNil,
  flatten,
  pathSatisfies,
  not,
} from 'ramda';

import {
  requestSequence,
  PATIENT_PRESCRIPTION_TYPES,
  UNSAVED_PRESCRIPTION_IDS,
  PATIENT_ACTIONS,
  getPatientStockRequest,
} from 'src/core';
import { hasValue } from 'src/utils/validation-helpers';

import {
  GET_THERAPIES_REQUEST,
  GET_CLINIC_GUIDES_REQUEST,
  GET_FREQUENCIES_REQUEST,
  GET_STRIP_MODELS_REQUEST,
  GET_CURRENT_PRESCRIPTION_REQUEST,
  PRESCRIPTION_ACTIONS,
  SAVE_PRESCRIPTION_REQUEST,
  FETCH_TEMPORARY_REASONS_REQUEST,
  SAVE_CLINIC_GUIDE_REQUEST,
  DELETE_CLINIC_GUIDE_REQUEST,
} from './prescription.constants';
import {
  INITIAL_PRESCRIPTION_FORM_STATE,
  INITIAL_TEMPORARY_PRESCRIPTION_FORM_STATE,
} from './prescription.reducers';
import {
  getFrequenciesRequest,
  setActivePrescriptionForm,
  addPrescriptionEntry,
  resetPrescription,
  getTherapiesRequest,
  getClinicGuidesRequest,
  fetchTemporaryReasonsRequest,
  updateQuantitiesAndPeriods,
  getCurrentPrescriptionRequest,
  hideCustomClinicGuidesForm,
} from './prescription.actions';
import {
  flattenPrescriptions,
  findClinicGuideWithPrescriptionId,
  flattenPrescriptionDateRange,
  shouldSetPrescriptionFormActive,
} from './prescription.utils';

export const constructUnsavedPermanent = () => ({
  ...INITIAL_PRESCRIPTION_FORM_STATE,
  id: UNSAVED_PRESCRIPTION_IDS.PERMANENT,
  prescriptionType: PATIENT_PRESCRIPTION_TYPES.PERMANENT,
});

export const constructUnsavedTemporary = () => ({
  ...INITIAL_TEMPORARY_PRESCRIPTION_FORM_STATE,
  id: UNSAVED_PRESCRIPTION_IDS.TEMPORARY,
  prescriptionType: PATIENT_PRESCRIPTION_TYPES.TEMPORARY,
});

export const constructUnsavedPrescription = prescriptionType =>
  equals(prescriptionType, PATIENT_PRESCRIPTION_TYPES.PERMANENT)
    ? constructUnsavedPermanent()
    : constructUnsavedTemporary();

export const combineWithDefaultFormState = prescription => ({
  ...INITIAL_PRESCRIPTION_FORM_STATE,
  ...prescription,
});

export const prescriptionTypeFromAction = ({ type }) =>
  equals(GET_CURRENT_PRESCRIPTION_REQUEST.ERROR, type)
    ? PATIENT_PRESCRIPTION_TYPES.PERMANENT
    : PATIENT_PRESCRIPTION_TYPES.TEMPORARY;

export const getCurrentPrescriptionEpic = getPrescriptionService =>
  requestSequence({
    service: getPrescriptionService,
    actionTypes: GET_CURRENT_PRESCRIPTION_REQUEST,
  });

export const createUnsavedPrescriptionEntryEpic = () => (action$, state) =>
  action$
    .ofType(
      GET_CURRENT_PRESCRIPTION_REQUEST.ERROR,
      PRESCRIPTION_ACTIONS.CREATE_PRESCRIPTION_ENTRY,
    )
    .map(
      pipe(
        prescriptionTypeFromAction,
        constructUnsavedPrescription,
        addPrescriptionEntry,
      ),
    );

export const isStripModelStockSet = stripModelId =>
  pathSatisfies(
    pipe(
      isNil,
      not,
    ),
    ['patientStock', stripModelId],
  );

export const conditionalAction = ({ condition, action }) =>
  condition ? [action] : [];

export const setCurrentPrescriptionsEpic = () => (action$, state) =>
  action$
    .ofType(GET_CURRENT_PRESCRIPTION_REQUEST.SUCCESS)
    .flatMap(({ payload }) => {
      const createPrescriptionActions = prescription => {
        const { stripModel, patientId } = prescription;
        const getPatientStock = conditionalAction({
          condition: !isStripModelStockSet(stripModel)(state.getState()),
          action: getPatientStockRequest.start({
            patientId,
            stripModelId: stripModel,
          }),
        });
        return [addPrescriptionEntry(prescription), ...getPatientStock];
      };
      return pipe(
        flattenPrescriptions,
        map(
          pipe(
            combineWithDefaultFormState,
            createPrescriptionActions,
          ),
        ),
        flatten,
      )(payload);
    });

export const onPrescriptionSaveFetchLatestEpic = () => (action$, state) =>
  action$.ofType(SAVE_PRESCRIPTION_REQUEST.SUCCESS).flatMap(({ payload }) => {
    const patientId = pathOr(null, ['patientId'], payload);
    return [
      resetPrescription(),
      ...conditionalAction({
        condition: hasValue(patientId),
        action: getCurrentPrescriptionRequest.start({ patientId }),
      }),
    ];
  });

export const addPrescriptionEntryEpic = () => (action$, state) =>
  action$
    .ofType(PRESCRIPTION_ACTIONS.ADD_PRESCRIPTION_ENTRY)
    .filter(({ payload }) =>
      shouldSetPrescriptionFormActive(payload)(state.getState()),
    )
    .map(({ payload: { id } }) => setActivePrescriptionForm(id));

export const getTherapiesEpic = getTherapiesService =>
  requestSequence({
    service: getTherapiesService,
    actionTypes: GET_THERAPIES_REQUEST,
  });

export const getClinicGuidesEpic = getClinicGuidesService =>
  requestSequence({
    service: getClinicGuidesService,
    actionTypes: GET_CLINIC_GUIDES_REQUEST,
    responseTransform: (data, action) => ({
      clinicGuides: data,
      id: action.payload.id,
    }),
  });

export const saveClinicGuideEpic = saveClinicGuideService =>
  requestSequence({
    service: saveClinicGuideService,
    actionTypes: SAVE_CLINIC_GUIDE_REQUEST,
  });

export const deleteClinicGuideEpic = deleteClinicGuideService =>
  requestSequence({
    service: deleteClinicGuideService,
    actionTypes: DELETE_CLINIC_GUIDE_REQUEST,
  });

export const refreshClinicGuidesEpic = () => action$ =>
  action$
    .ofType(
      SAVE_CLINIC_GUIDE_REQUEST.SUCCESS,
      DELETE_CLINIC_GUIDE_REQUEST.SUCCESS,
    )
    .mapTo(getClinicGuidesRequest.start());

export const onSaveClinicGuideEpic = () => (action$, state) =>
  action$
    .ofType(SAVE_CLINIC_GUIDE_REQUEST.SUCCESS)
    .mapTo(hideCustomClinicGuidesForm());

export const onClinicGuidesUpdateEpic = () => (action$, state) =>
  action$.ofType(GET_CLINIC_GUIDES_REQUEST.SUCCESS).flatMap(action => {
    const { id } = action.payload;
    const { permanent, temporary } = state.getState().prescription;
    const clinicGuide = findClinicGuideWithPrescriptionId(id)({
      permanent,
      temporary,
    });
    return conditionalAction({
      condition: hasValue(clinicGuide),
      action: updateQuantitiesAndPeriods({
        formId: id,
        clinicGuideId: clinicGuide,
      }),
    });
  });

export const getFrequenciesEpic = frequenciesService =>
  requestSequence({
    service: frequenciesService,
    actionTypes: GET_FREQUENCIES_REQUEST,
  });

export const getStripModelsEpic = stripModelsService =>
  requestSequence({
    service: stripModelsService,
    actionTypes: GET_STRIP_MODELS_REQUEST,
  });

export const fetchTemporaryPrescriptionReasonsEpic = reasonsService =>
  requestSequence({
    service: reasonsService,
    actionTypes: FETCH_TEMPORARY_REASONS_REQUEST,
  });

export const flattenSavedPrescriptionDateRange = query => ({
  ...query,
  prescription: flattenPrescriptionDateRange(query.prescription),
});

export const addSavedPrescriptionIds = (returnedPrescription, action) => ({
  patientId: action.payload.patientId,
  previousPrescriptionId: action.payload.prescriptionId,
  prescription: returnedPrescription,
});

export const savePrescriptionEpic = savePrescriptionService =>
  requestSequence({
    service: savePrescriptionService,
    actionTypes: SAVE_PRESCRIPTION_REQUEST,
    queryTransform: flattenSavedPrescriptionDateRange,
    responseTransform: addSavedPrescriptionIds,
    options: { delay: true },
  });

export const onPatientChangeResetPrescriptionEpic = () => action$ =>
  action$
    .ofType(PATIENT_ACTIONS.SET_NEW_PATIENT)
    .flatMap(action => [resetPrescription()]);

export const initializePrescriptionEpic = () => (action$, state) =>
  action$
    .ofType(PRESCRIPTION_ACTIONS.INITIALIZE_PRESCRIPTION)
    .flatMap(action => {
      const { therapyId, formId, isTemporaryPrescription } = action.payload;
      const fetchTemporaryReasons = conditionalAction({
        condition: isTemporaryPrescription,
        action: fetchTemporaryReasonsRequest.start(),
      });
      return [
        getTherapiesRequest.start(),
        getFrequenciesRequest.start(),
        getClinicGuidesRequest.start({ id: formId, therapyId }),
        ...fetchTemporaryReasons,
      ];
    });
