import { createSelector, createStructuredSelector } from 'reselect';

import {
  selectNumberOfStripsToDeliver,
  selectLastCollectedDate,
  selectTrafficLightStatus,
  selectTrafficLightStatusConditions,
  selectHasActivePrescription,
  selectDeliveryRequestHasError,
  selectCurrentPrescriptionStripModel,
  numberOfStripsToTubes,
  selectTrafficLightStatusId,
  selectTrafficLightStatusForced,
  formatStripDeliveryDateString,
  selectNextDeliveryDate,
} from 'src/core/strip-delivery';
import { selectPatientId } from 'src/core/patient';
import { translate } from 'src/i18n';

import { checkStripsCanBeDelivered } from './components/strip-status-card';

export const selectNumberOfTubesToDeliver = createSelector(
  selectNumberOfStripsToDeliver,
  numberOfStripsToTubes,
);

export const selectStripsCanBeDelivered = createSelector(
  selectNumberOfTubesToDeliver,
  selectTrafficLightStatus,
  checkStripsCanBeDelivered,
);
export const selectLastCollectedDateString = createSelector(
  selectLastCollectedDate,
  dateString =>
    formatStripDeliveryDateString(
      dateString,
      translate('stripDelivery.empty.lastCollectedDate'),
    ),
);
export const selectNextDeliveryDateString = createSelector(
  selectNextDeliveryDate,
  dateString =>
    formatStripDeliveryDateString(
      dateString,
      translate('stripDelivery.empty.nextDeliveryDate'),
    ),
);

const selectPatientDelivery = createSelector(
  selectPatientId,
  selectNumberOfStripsToDeliver,
  selectCurrentPrescriptionStripModel,
  selectTrafficLightStatus,
  selectTrafficLightStatusConditions,
  selectTrafficLightStatusId,
  selectTrafficLightStatusForced,
  (
    patientId,
    numberOfStrips,
    stripModelId,
    status,
    conditions,
    id,
    forced,
  ) => ({
    patientId,
    stripModelId,
    numberOfStrips,
    trafficLightStatus: {
      id,
      status,
      conditions,
      forced,
    },
  }),
);
export const patientStripStatusConnector = createStructuredSelector({
  numberOfTubesToDeliver: selectNumberOfTubesToDeliver,
  lastCollectedDate: selectLastCollectedDateString,
  nextDeliveryDate: selectNextDeliveryDateString,
  trafficLightStatus: selectTrafficLightStatus,
  patientId: selectPatientId,
  hasActivePrescription: selectHasActivePrescription,
  hasError: selectDeliveryRequestHasError,
  stripsCanBeDelivered: selectStripsCanBeDelivered,
  patientDelivery: selectPatientDelivery,
});
