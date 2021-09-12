import { compose, mapProps } from 'recompose';
import { connect } from 'react-redux';
import { prop, propOr } from 'ramda';

import { mapDispatchers } from 'src/utils';
import { getCurrentPrescriptionRequest } from 'src/core/prescription';
import {
  getDeliveryRequest,
  getTimeIntervalsRequest,
  setDeliveryStatusRequest,
  submitLostStripsRequest,
  submitManualDeliveryRequest,
} from 'src/core';

import { StripDelivery } from './strip-delivery.component';
import { stripDeliveryConnector } from './store/strip-delivery.selectors';

const dispatchers = mapDispatchers({
  getTimeIntervals: getTimeIntervalsRequest.start,
  getCurrentPrescriptionRequest: getCurrentPrescriptionRequest.start,
  getDeliveryRequest: getDeliveryRequest.start,
  setDeliveryStatusRequest: setDeliveryStatusRequest.start,
  submitLostStripsRequest: submitLostStripsRequest.start,
  submitManualDeliveryRequest: submitManualDeliveryRequest.start,
});

export const stripDeliveryMapProps = props => ({
  period: prop('period', props.currentPrescription),
  quantity: prop('quantity', props.currentPrescription),
  frequency: prop('frequency', props.currentPrescription),
  stripModelId: prop('stripModel', props.currentPrescription),
  stripModelName: prop('stripModelName', props.currentPrescription),
  prescriptionType: prop('prescriptionType', props.currentPrescription),
  patientStripStock: propOr(
    null,
    prop('stripModel', props.currentPrescription),
    props.patientStock,
  ),
  ...props,
});

export const StripDeliveryContainer = compose(
  connect(
    stripDeliveryConnector,
    dispatchers,
  ),
  mapProps(stripDeliveryMapProps),
)(StripDelivery);
