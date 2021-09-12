import { createStructuredSelector } from 'reselect';
import { values } from 'ramda';

import {
  selectIsCustomClinicGuidesFormOpen,
  selectTherapyDropdownOptions,
  selectDisplayedCustomClinicGuides,
  selectGuideHistoryFilter,
  selectTherapies,
  selectGuidePageNumbers,
  selectGuideHistoryPage,
} from 'src/core/prescription';

import { CUSTOM_GUIDES_PERIODS } from './custom-clinic-guides.constants';

const selectCustomClinicGuidePeriodDropdownOptions = () =>
  values(CUSTOM_GUIDES_PERIODS);

export const customClinicGuidesConnector = createStructuredSelector({
  isCreateCustomGuideFormOpen: selectIsCustomClinicGuidesFormOpen,
  customClinicGuides: selectDisplayedCustomClinicGuides,
  guideHistoryFilter: selectGuideHistoryFilter,
  therapies: selectTherapies,
  guidePageNumbers: selectGuidePageNumbers,
  currentGuidePage: selectGuideHistoryPage,
});

export const customClinicGuidesFormConnector = createStructuredSelector({
  periods: selectCustomClinicGuidePeriodDropdownOptions,
  therapies: selectTherapyDropdownOptions,
});
