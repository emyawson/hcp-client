import { createStructuredSelector } from 'reselect';

import {
  selectTrafficLightStatus,
  selectTrafficLightStatusConditions,
  selectDeliveryStatusId,
  selectHasLastDeliveryWithAlert,
} from 'src/core/strip-delivery';
import { selectPatientId } from 'src/core/patient';

export const sendPatientStatusModalConnector = createStructuredSelector({
  trafficLightStatus: selectTrafficLightStatus,
  trafficLightStatusConditions: selectTrafficLightStatusConditions,
  patientId: selectPatientId,
  deliveryStatusId: selectDeliveryStatusId,
  hasLastDeliveryWithAlert: selectHasLastDeliveryWithAlert,
});
