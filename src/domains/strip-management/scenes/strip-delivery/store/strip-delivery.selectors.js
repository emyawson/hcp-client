import { createSelector, createStructuredSelector } from 'reselect';

import {
  selectTrafficLightStatus,
  selectTrafficLightStatusConditions,
  selectForceTrafficStatus,
  selectHasActivePrescription,
  selectHasStripDeliveryData,
  selectLastDeliveryTrafficLightStatus,
  selectNextDeliveryDate,
  formatStripDeliveryDateString,
  selectHasForcedStatusComment,
  selectTrafficLightStatusComment,
  selectTrafficLightStatusDateCalculated,
  selectHasLastDeliveryWithAlert,
} from 'src/core/strip-delivery';
import { selectPatientStock } from 'src/core/patient-stock';
import {
  selectCurrentPrescriptionWithStripModels,
  selectGetPrescriptionHasError,
} from 'src/core/prescription';
import { selectPatientId } from 'src/core/patient';
import { translate } from 'src/i18n';

const selectNextDeliveryDateString = createSelector(
  selectNextDeliveryDate,
  dateString =>
    formatStripDeliveryDateString(
      dateString,
      translate('stripDelivery.empty.nextDeliveryDate'),
    ),
);

const selectTrafficLightStatusDateCalculatedString = createSelector(
  selectTrafficLightStatusDateCalculated,
  dateString =>
    formatStripDeliveryDateString(
      dateString,
      translate('stripDelivery.empty.nextDeliveryDate'),
    ),
);

export const stripDeliveryConnector = createStructuredSelector({
  patientStock: selectPatientStock,
  currentPrescription: selectCurrentPrescriptionWithStripModels,
  trafficLightStatus: selectTrafficLightStatus,
  trafficLightStatusConditions: selectTrafficLightStatusConditions,
  lastDeliveryTrafficLightStatus: selectLastDeliveryTrafficLightStatus,
  patientId: selectPatientId,
  forceTrafficStatus: selectForceTrafficStatus,
  hasActivePrescription: selectHasActivePrescription,
  hasStripDeliveryData: selectHasStripDeliveryData,
  getPrescriptionHasError: selectGetPrescriptionHasError,
  nextDeliveryDate: selectNextDeliveryDateString,
  hasForcedStatusComment: selectHasForcedStatusComment,
  trafficLightStatusComment: selectTrafficLightStatusComment,
  trafficLightStatusDateCalculated: selectTrafficLightStatusDateCalculatedString,
  hasLastDeliveryWithAlert: selectHasLastDeliveryWithAlert,
});
