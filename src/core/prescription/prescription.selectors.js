import { createSelector } from 'reselect';
import {
  path,
  map,
  pipe,
  length,
  pathOr,
  lte,
  not,
  prop,
  contains,
  filter,
  propEq,
  allPass,
  always,
  find,
  anyPass,
} from 'ramda';

import { isNotEmpty, hasValue } from 'src/utils/validation-helpers';

import {
  MAX_PRESCRIPTIONS,
  GET_CURRENT_PRESCRIPTION,
  CLINIC_GUIDE_TYPES,
  GUIDE_HISTORY_FILTERS,
} from './prescription.constants';
import {
  flattenPrescriptions,
  onlyContainsNewPermanentForm,
  pickCustomClinicGuides,
  addStripModelNameToPrescription,
  prescriptionsToKeyedOptionObject,
  getOptionsArrayFromActiveForm,
  convertFrequencyObjectToFrequencyId,
  sliceGuideHistoryByPage,
  guidesToPageNumbers,
} from './prescription.utils';
import {
  therapyToDropdownOption,
  clinicGuideToDropdownOption,
  frequencyToDropdownOption,
  stripModelToDropdownOption,
  quantityToDropdownOption,
  periodToDropdownOption,
  reasonToDropdownOption,
} from './prescription.transforms';

import {
  createRequestHasErrorSelector,
  selectOngoingRequests,
} from '../request/request.selectors';

export const selectActiveForms = path(['prescription', 'activeForms']);
export const selectActiveFormId = path(['prescription', 'activeFormId']);
export const selectTemporaryPrescriptions = path(['prescription', 'temporary']);
export const selectPermanentPrescription = path(['prescription', 'permanent']);
export const selectStripModels = path(['prescription', 'stripModels']);
export const selectFrequencies = path(['prescription', 'frequencies']);
export const selectTherapies = path(['prescription', 'therapies']);
export const selectClinicGuides = path(['prescription', 'clinicGuides']);
export const selectGuideHistoryFilter = path([
  'prescription',
  'guideHistoryFilter',
]);
export const selectGuideHistoryPage = path([
  'prescription',
  'guideHistoryPage',
]);
export const selectIsCustomClinicGuidesFormOpen = path([
  'prescription',
  'isCreatingCustomClinicGuides',
]);

export const selectPrescriptionsList = createSelector(
  selectTemporaryPrescriptions,
  selectPermanentPrescription,
  (temporary, permanent) => ({
    temporary,
    permanent,
  }),
);

export const selectPrescriptions = createSelector(
  selectPrescriptionsList,
  selectStripModels,
  (prescriptions, stripModels) =>
    pipe(
      map(addStripModelNameToPrescription(stripModels)),
      map(convertFrequencyObjectToFrequencyId),
    )(prescriptions),
);

export const selectActivePrescriptionType = pathOr(null, [
  'prescription',
  'activePrescription',
]);

export const selectCurrentPrescription = createSelector(
  selectPrescriptionsList,
  selectActivePrescriptionType,
  (prescriptions, active) =>
    hasValue(active) && hasValue(prescriptions[active])
      ? prescriptions[active]
      : null,
);

// Takes in a shaper (should shape an option object to a dropdown option object)
// and the name of the option ex. "frequencies" and returns a selector
// which will return an object containing possible options of that type (ex. "frequencies")
// for every active form.
const createDropdownOptionsSelector = (dropdownOptionShaper, optionsName) =>
  createSelector(
    selectActiveForms,
    // Collect the relevant options array (as in, "frequencies" or "clinic guides" etc.)
    // from every active form and shape them to be dropdown options arrays
    map(
      pipe(
        getOptionsArrayFromActiveForm(optionsName),
        map(dropdownOptionShaper),
      ),
    ),
  );

export const selectTherapyDropdownOptions = createSelector(
  selectTherapies,
  map(therapyToDropdownOption),
);
export const selectClinicGuideFilter = createSelector(
  selectActiveForms,
  map(path(['clinicGuideFilter'])),
);

export const isCustom = propEq('type', CLINIC_GUIDE_TYPES.CUSTOM);
const isActive = propEq('isActive', true);
const isFilterType = filterType => propEq('type', filterType);

export const selectFilteredClinicGuideOptions = createSelector(
  selectActiveForms,
  selectPrescriptions,
  (forms, prescriptions) =>
    map(form => {
      const guides = pathOr([], ['clinicGuides'], form);
      const savedPrescriptionGuide = pipe(
        find(propEq('id', form.id)),
        pathOr(null, ['clinicGuide']),
      )([prescriptions.permanent, prescriptions.temporary]);
      const filteredClinicGuides = filter(
        allPass([
          isFilterType(form.clinicGuideFilter),
          anyPass([
            propEq('id', savedPrescriptionGuide),
            isActive,
            isFilterType(CLINIC_GUIDE_TYPES.PRESET),
          ]),
        ]),
        guides,
      );
      return {
        ...form,
        clinicGuides: filteredClinicGuides,
      };
    })(forms),
);

export const selectClinicGuideDropdownOptions = createSelector(
  selectFilteredClinicGuideOptions,
  map(
    pipe(
      getOptionsArrayFromActiveForm('clinicGuides'),
      map(clinicGuideToDropdownOption),
    ),
  ),
);

export const selectFrequencyDropdownOptions = createSelector(
  selectFrequencies,
  map(frequencyToDropdownOption),
);

export const selectStripModelDropdownOptions = createSelector(
  selectStripModels,
  map(stripModelToDropdownOption),
);

export const selectQuantityDropdownOptions = createDropdownOptionsSelector(
  quantityToDropdownOption,
  'quantities',
);

export const selectPeriodDropdownOptions = createDropdownOptionsSelector(
  periodToDropdownOption,
  'periods',
);

export const selectReasonDropdownOptions = createDropdownOptionsSelector(
  reasonToDropdownOption,
  'reasons',
);

const createOptionSelector = optionName =>
  createSelector(
    selectPrescriptions,
    pipe(
      flattenPrescriptions,
      prescriptionsToKeyedOptionObject(optionName),
    ),
  );

export const selectTherapy = createOptionSelector('therapy');
export const selectClinicGuide = createOptionSelector('clinicGuide');
export const selectFrequency = createOptionSelector('frequency');
export const selectQuantity = createOptionSelector('quantity');
export const selectPeriod = createOptionSelector('period');
export const selectReason = createOptionSelector('reason');
export const selectStartDate = createOptionSelector('startDate');
export const selectEndDate = createOptionSelector('endDate');

export const selectStripModel = createSelector(
  selectPermanentPrescription,
  pathOr(null, ['stripModel']),
);

export const selectPrescriptionsLoading = createSelector(
  selectOngoingRequests,
  onGoingRequests => contains(GET_CURRENT_PRESCRIPTION)(onGoingRequests),
);

export const selectGetPrescriptionHasError = createRequestHasErrorSelector([
  GET_CURRENT_PRESCRIPTION,
]);

export const selectUserHasMaxPrescriptions = createSelector(
  selectPrescriptions,
  prescriptions =>
    lte(
      MAX_PRESCRIPTIONS,
      pipe(
        flattenPrescriptions,
        length,
      )(prescriptions),
    ),
);

export const selectOnlyContainsNewPermanentForm = createSelector(
  selectPrescriptions,
  onlyContainsNewPermanentForm,
);

export const selectDisplayAddTemporaryPrescription = createSelector(
  selectUserHasMaxPrescriptions,
  pipe(not),
);

// Determine if Add Temporary Prescription button should be enabled
// Disable this action if:
// -- Prescriptions are loading from the API
// -- User has already hit the max number of prescriptions to show in UI
export const selectAllowAddTemporaryPrescription = createSelector(
  selectPrescriptionsLoading,
  selectOnlyContainsNewPermanentForm,
  selectUserHasMaxPrescriptions,
  (isLoading, onlyContainsNewPermanentForm, hasMaxPrescriptions) =>
    isLoading || onlyContainsNewPermanentForm || hasMaxPrescriptions
      ? false
      : true,
);

export const selectCustomClinicGuides = createSelector(
  selectActiveForms,
  map(
    pipe(
      getOptionsArrayFromActiveForm('clinicGuides'),
      pickCustomClinicGuides,
    ),
  ),
);

export const selectHasCustomClinicGuide = createSelector(
  selectActiveForms,
  map(pathOr(false, ['hasCustomClinicGuide'])),
);

export const selectCurrentPrescriptionFrequency = createSelector(
  selectCurrentPrescription,
  prop('frequency'),
);

export const selectCurrentPrescriptionWithStripModels = createSelector(
  selectCurrentPrescription,
  selectStripModels,
  (prescription, stripModels) =>
    isNotEmpty(stripModels)
      ? addStripModelNameToPrescription(stripModels)(prescription)
      : prescription,
);

const selectClinicGuidesWithTherapyNames = createSelector(
  selectClinicGuides,
  selectTherapies,
  (clinicGuides, therapies) => {
    if (!therapies.length) return clinicGuides;

    const therapiesName = therapies.reduce((result, current) => {
      result[current.id] = current.name;
      return result;
    }, {});

    return clinicGuides.map(guide => ({
      ...guide,
      therapyName: therapiesName[guide.therapyId],
    }));
  },
);

export const selectActiveCustomClinicGuides = createSelector(
  selectClinicGuidesWithTherapyNames,
  filter(allPass([isCustom, isActive])),
);

const GUIDE_HISTORY_FILTER_FNS = {
  [GUIDE_HISTORY_FILTERS.ALL]: always(true),
  [GUIDE_HISTORY_FILTERS.PERSONAL]: propEq('isRemovable', true),
};

export const selectDisplayedCustomClinicGuides = createSelector(
  selectActiveCustomClinicGuides,
  selectGuideHistoryFilter,
  selectGuideHistoryPage,
  (guides, guideFilter, page) =>
    pipe(
      filter(GUIDE_HISTORY_FILTER_FNS[guideFilter]),
      sliceGuideHistoryByPage(page),
    )(guides),
);

export const selectGuidePageNumbers = createSelector(
  selectActiveCustomClinicGuides,
  selectGuideHistoryFilter,
  (guides, guideFilter) =>
    pipe(
      filter(GUIDE_HISTORY_FILTER_FNS[guideFilter]),
      guidesToPageNumbers,
    )(guides),
);
