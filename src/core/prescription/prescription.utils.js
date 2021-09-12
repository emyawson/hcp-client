import {
  allPass,
  equals,
  isNil,
  pathOr,
  pipe,
  propEq,
  reject,
  any,
  prop,
  range,
  find,
  map,
  reduce,
  dissoc,
  assoc,
  not,
  path,
  filter,
  assocPath,
  merge,
  pick,
  either,
  slice,
  sortBy,
  length,
  always,
  identity,
  ifElse,
  divide,
  add,
} from 'ramda';

import { isNotNil, hasValue } from 'src/utils/validation-helpers';
import { frequencyToString } from 'src/services/frequencies/frequencies.utils';

import {
  PATIENT_PRESCRIPTION_TYPES,
  UNSAVED_PRESCRIPTION_IDS,
  FLATTENED_UNSAVED_PRESCRIPTION_IDS,
  GUIDES_PER_HISTORY_PAGE,
} from './prescription.constants';

// flattenPrescriptions receives the prescriptions object which is the following structure:
// {
//    permanent: Prescription,
//    temporary: Prescription,
// }
// and flattens it into an array of prescription objects.
//
// Since, if the patient does not have a current prescription, the value of
// permanent will be null, ramda reject + isNil is used to remove the null
// entry from the array (if there is one) so that the array can be used
// gracefully in other files.
export const flattenPrescriptions = prescriptions =>
  !isNil(prescriptions)
    ? reject(isNil, [prescriptions.permanent, prescriptions.temporary])
    : [];

const hasFormId = formId => allPass([hasValue, propEq('id', formId)]);

export const isNewPermanentForm = hasFormId(UNSAVED_PRESCRIPTION_IDS.PERMANENT);

export const onlyContainsNewPermanentForm = allPass([
  pipe(
    prop(PATIENT_PRESCRIPTION_TYPES.TEMPORARY),
    isNil,
  ),
  pipe(
    prop(PATIENT_PRESCRIPTION_TYPES.PERMANENT),
    isNewPermanentForm,
  ),
]);

// Create array with every number between min and max
export const clinicGuideToQuantities = clinicGuide => {
  const min = prop('minimumStrips', clinicGuide);
  const max = prop('maximumStrips', clinicGuide);
  return any(isNil, [min, max]) ? [] : range(min, max + 1);
};

export const clinicGuideToPeriods = clinicGuide =>
  pipe(
    path(['period']),
    period => [period],
    reject(isNil),
  )(clinicGuide);

export const findClinicGuideWithClinicGuideId = clinicGuideId => clinicGuides =>
  find(propEq('id', clinicGuideId), clinicGuides) || {};

export const findClinicGuideWithPrescriptionId = prescriptionId =>
  pipe(
    flattenPrescriptions,
    find(propEq('id', prescriptionId)),
    pathOr(null, ['clinicGuide']),
  );

// Use if you are setting options of more than one field at once
// Expects object in newFormOptions
export const setAllFieldsOptions = (formId, newFormOptions) => state => {
  const activeForms = {
    ...state.activeForms,
    [formId]: {
      ...state.activeForms[formId],
      ...newFormOptions,
    },
  };
  return {
    ...state,
    activeForms,
  };
};

// Use if setting options/value for just one field
export const setFieldOptions = (field, newFieldOptions, formId) => state => {
  const activeForm = {
    ...state.activeForms[formId],
    [field]: newFieldOptions,
  };
  const activeForms = {
    ...state.activeForms,
    [formId]: activeForm,
  };
  return {
    ...state,
    activeForms,
  };
};

// Maps options of a certain field over all active forms
// (ex- all forms use the same set of frequencies)
export const setFieldOptionsForAllForms = (field, newFieldOptions) => state => {
  const activeForms = map(
    form => ({ ...form, [field]: newFieldOptions }),
    state.activeForms,
  );
  return {
    ...state,
    activeForms,
  };
};

const isTemporaryPrescription = (state, id) =>
  propEq('id', id)(state.temporary);

// Maps options of a certain field over all temporary active forms
export const setFieldOptionsForTemporaryForm = (
  field,
  newFieldOptions,
) => state => {
  const activeForms = map(
    form =>
      isTemporaryPrescription(state, form.id)
        ? { ...form, [field]: newFieldOptions }
        : form,
    state.activeForms,
  );
  return {
    ...state,
    activeForms,
  };
};

export const setPrescriptionByType = prescription =>
  assoc(prescription.prescriptionType, prescription);

const isOutdatedAfterSave = previousId => propEq('id', previousId);

export const removeActiveForm = formId => state => {
  const activeForms = reject(isOutdatedAfterSave(formId), state.activeForms);
  return { ...state, activeForms };
};

export const removePrescription = formId => state => {
  const prescriptions = reject(hasFormId(formId))({
    permanent: state.permanent,
    temporary: state.temporary,
  });
  return {
    ...state,
    permanent: prescriptions.permanent,
    temporary: prescriptions.temporary,
  };
};

export const setActiveFormId = formId => state => ({
  ...state,
  activeFormId: formId,
});

export const flattenPrescriptionDateRange = prescription => {
  const startDate = pathOr(null, ['dateRange', 'startDate'], prescription);
  const endDate = pathOr(null, ['dateRange', 'endDate'], prescription);
  return pipe(
    assoc('startDate', startDate),
    assoc('endDate', endDate),
    dissoc('dateRange'),
  )(prescription);
};

// Compare a given form ID against placeholder form IDs
export const isUnsavedPrescription = prescription =>
  any(equals(prop('id', prescription)))(FLATTENED_UNSAVED_PRESCRIPTION_IDS);

// If ID is not found in placeholder set, it is a valid database ID
export const hasSavedPrescriptionId = pipe(
  isUnsavedPrescription,
  not,
);

// Determine if a prescription form was fetched from the database
export const isSavedPrescription = allPass([isNotNil, hasSavedPrescriptionId]);

export const isTypeTemporary = equals(PATIENT_PRESCRIPTION_TYPES.TEMPORARY);
export const isTypePermanent = equals(PATIENT_PRESCRIPTION_TYPES.PERMANENT);

const isCustomClinicGuide = pipe(
  prop('isCustom'),
  equals(true),
);
export const pickCustomClinicGuides = filter(isCustomClinicGuide);

export const getOptionsArrayFromActiveForm = optionsName =>
  pipe(
    pick([optionsName]),
    pathOr([], [optionsName]),
  );

// Below: returns object of the shape
// { [form id key]: { option: optionId } }
// for relevant option (ie - therapy, clinic guide, etc)
// Will have an entry per form found in prescriptions array
export const prescriptionsToKeyedOptionObject = optionName =>
  pipe(
    map(prescription => ({ [prescription.id]: prescription[optionName] })),
    reduce(merge, {}),
  );

export const addStripModelNameToPrescription = stripModels => prescription => {
  const stripModelId = prop('stripModel', prescription);
  const stripModelName = pipe(
    find(propEq('id', stripModelId)),
    prop('name'),
  )(stripModels);
  return hasValue(stripModelName)
    ? assocPath(['stripModelName'], stripModelName, prescription)
    : prescription;
};

export const convertFrequencyObjectToFrequencyId = prescription =>
  hasValue(prescription)
    ? {
        ...prescription,
        frequency: frequencyToString(prescription.frequency),
      }
    : prescription;

export const shouldSetPrescriptionFormActive = payload => state => {
  const activePrescriptionId = pathOr(null, [
    'prescription',
    'activePrescription',
  ])(state);
  return either(
    isUnsavedPrescription,
    propEq('prescriptionType', activePrescriptionId),
  )(payload);
};
export const sliceGuideHistoryByPage = page => guides => {
  const start = page * GUIDES_PER_HISTORY_PAGE - GUIDES_PER_HISTORY_PAGE;
  const end = page * GUIDES_PER_HISTORY_PAGE;
  return pipe(
    sortBy(prop('name')),
    slice(start, end),
  )(guides);
};
export const guidesToPageNumbers = pipe(
  length,
  ifElse(equals(0), always(1), identity),
  guides => divide(guides, GUIDES_PER_HISTORY_PAGE),
  Math.ceil,
  add(1),
  range(1),
);
