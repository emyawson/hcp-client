import { createStructuredSelector, createSelector } from 'reselect';

import { translate } from 'src/i18n';
import {
  selectActiveFormId,
  selectCurrentPrescriptionWithStripModels,
  selectPrescriptionsLoading,
  selectPrescriptions,
  selectAllowAddTemporaryPrescription,
  selectClinicGuide,
  selectClinicGuideDropdownOptions,
  selectFrequency,
  selectFrequencyDropdownOptions,
  selectPeriod,
  selectPeriodDropdownOptions,
  selectQuantity,
  selectQuantityDropdownOptions,
  selectReason,
  selectReasonDropdownOptions,
  selectStripModel,
  selectStripModelDropdownOptions,
  selectTherapy,
  selectTherapyDropdownOptions,
  selectStartDate,
  selectEndDate,
  selectGetPrescriptionHasError,
  selectDisplayAddTemporaryPrescription,
  selectCustomClinicGuides,
  selectHasCustomClinicGuide,
  selectClinicGuideFilter,
} from 'src/core/prescription';
import {
  selectClinicId,
  selectDepartmentId,
  formatStripDeliveryDateString,
  selectNextDeliveryDate,
} from 'src/core/strip-delivery';
import { selectPatientStock } from 'src/core/patient-stock';

const selectNextDeliveryDateString = createSelector(
  selectNextDeliveryDate,
  dateString =>
    formatStripDeliveryDateString(
      dateString,
      translate('stripDelivery.empty.nextDeliveryDate'),
    ),
);
export const prescriptionConnector = createStructuredSelector({
  activeFormId: selectActiveFormId,
  activePrescription: selectCurrentPrescriptionWithStripModels,
  isLoading: selectPrescriptionsLoading,
  nextDeliveryDate: selectNextDeliveryDateString,
  prescriptions: selectPrescriptions,
  displayAddTemporaryPrescription: selectDisplayAddTemporaryPrescription,
  allowAddTemporaryPrescription: selectAllowAddTemporaryPrescription,
  patientStock: selectPatientStock,
  prescriptionHasError: selectGetPrescriptionHasError,
});

export const prescriptionFormConnector = createStructuredSelector({
  therapies: selectTherapyDropdownOptions,
  clinicGuides: selectClinicGuideDropdownOptions,
  frequencies: selectFrequencyDropdownOptions,
  quantities: selectQuantityDropdownOptions,
  stripModels: selectStripModelDropdownOptions,
  periods: selectPeriodDropdownOptions,
  reasons: selectReasonDropdownOptions,
  therapy: selectTherapy,
  frequency: selectFrequency,
  clinicGuide: selectClinicGuide,
  stripModel: selectStripModel,
  quantity: selectQuantity,
  period: selectPeriod,
  reason: selectReason,
  startDate: selectStartDate,
  endDate: selectEndDate,
  clinicId: selectClinicId,
  departmentId: selectDepartmentId,
  customClinicGuides: selectCustomClinicGuides,
  hasCustomClinicGuide: selectHasCustomClinicGuide,
  clinicGuideFilter: selectClinicGuideFilter,
});
