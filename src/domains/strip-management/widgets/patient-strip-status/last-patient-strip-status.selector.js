import { createStructuredSelector, createSelector } from 'reselect';

import {
  selectLastDeliveryStatusRequestHasError,
  selectLastTrafficLightStatus,
  formatStripDeliveryDateString,
  numberOfStripsToTubes,
  selectLastNumberOfStripsToDeliver,
  selectLastStatusLastCollectedDate,
  selectLastStatusNextDeliveryDate,
} from 'src/core/strip-delivery';
import { selectPatientId } from 'src/core/patient';
import { translate } from 'src/i18n';

const selectLastStatusLastCollectedDateString = createSelector(
  selectLastStatusLastCollectedDate,
  dateString =>
    formatStripDeliveryDateString(
      dateString,
      translate('stripDelivery.empty.lastCollectedDate'),
    ),
);
const selectLastStatusNextDeliveryDateString = createSelector(
  selectLastStatusNextDeliveryDate,
  dateString =>
    formatStripDeliveryDateString(
      dateString,
      translate('stripDelivery.empty.nextDeliveryDate'),
    ),
);

const selectLastNumberOfTubesToDeliver = createSelector(
  selectLastNumberOfStripsToDeliver,
  numberOfStripsToTubes,
);

export const lastPatientStripStatusConnector = createStructuredSelector({
  numberOfTubesToDeliver: selectLastNumberOfTubesToDeliver,
  lastCollectedDate: selectLastStatusLastCollectedDateString,
  nextDeliveryDate: selectLastStatusNextDeliveryDateString,
  trafficLightStatus: selectLastTrafficLightStatus,
  patientId: selectPatientId,
  hasError: selectLastDeliveryStatusRequestHasError,
});
