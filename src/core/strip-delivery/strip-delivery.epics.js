import { pathOr } from 'ramda';

import { requestSequence, REQUEST_ANIMATION_DELAY } from 'src/core/request';
import { getPatientStockRequest } from 'src/core/patient-stock/patient-stock.actions';
import {
  getDeliveryRequest,
  getDeliveryStatusRequest,
  getLastDeliveryStatusRequest,
} from 'src/core/strip-delivery/strip-delivery.actions';
import { createModal, MODAL_TYPES } from 'src/core/modal';
import { getToken } from 'src/core/authentication';

import { selectCurrentPrescriptionStripModel } from './strip-delivery.selectors';
import {
  SET_DELIVERY_STATUS_REQUEST,
  GET_DELIVERY_STATUS_REQUEST,
  GET_DELIVERY_REQUEST,
  SAVE_DELIVERY_REQUEST,
  GET_THRESHOLDS_REQUEST,
  GET_TIME_INTERVALS_REQUEST,
  GET_LAST_DELIVERY_STATUS_REQUEST,
  SAVE_DELIVERY_STATUS_COMMENT_REQUEST,
} from './strip-delivery.constants';
import {
  shouldTriggerNotificationModal,
  shouldTriggerSendPatientStatusModal,
} from './strip-delivery.utils';

const deliveryRequestSequenceOptions = {
  delay: true,
};

export const getTimeIntervalsEpic = timeIntervalsService =>
  requestSequence({
    service: timeIntervalsService,
    actionTypes: GET_TIME_INTERVALS_REQUEST,
  });

export const getDeliveryStatusEpic = getDeliveryStatusService => (
  action$,
  store,
) =>
  action$
    .ofType(GET_DELIVERY_STATUS_REQUEST.START)
    .flatMap(action =>
      getDeliveryStatusService(action.payload, getToken(store.getState()))
        .then(data =>
          getDeliveryStatusRequest.success({
            ...data,
            hasModal: action.payload.hasModal,
            customComponent: action.payload.modalComponent,
            hasForceStatus: action.payload.hasForceStatus,
          }),
        )
        .catch(error => getDeliveryStatusRequest.error(error)),
    )
    .delay(REQUEST_ANIMATION_DELAY);

export const getLastDeliveryStatusEpic = getLastDeliveryStatusService => (
  action$,
  store,
) =>
  action$
    .ofType(GET_LAST_DELIVERY_STATUS_REQUEST.START)
    .flatMap(action =>
      getLastDeliveryStatusService(action.payload, getToken(store.getState()))
        .then(data =>
          getLastDeliveryStatusRequest.success({
            ...data,
            hasModal: action.payload.hasModal,
            customComponent: action.payload.modalComponent,
            hasForceStatus: action.payload.hasForceStatus,
          }),
        )
        .catch(error => getLastDeliveryStatusRequest.error(error)),
    )
    .delay(REQUEST_ANIMATION_DELAY);

export const createSendPatientStatusModalEpic = () => (action$, store) =>
  action$
    .ofType(GET_DELIVERY_STATUS_REQUEST.SUCCESS)
    .filter(({ payload }) => shouldTriggerSendPatientStatusModal(payload))
    .map(({ payload }) =>
      createModal({
        key: MODAL_TYPES.CUSTOM,
        data: {
          customComponent: payload.customComponent,
        },
      }),
    );

export const getThresholdsEpic = thresholdService =>
  requestSequence({
    service: thresholdService,
    actionTypes: GET_THRESHOLDS_REQUEST,
  });

export const getDeliveryEpic = getDeliveryService =>
  requestSequence({
    service: getDeliveryService,
    actionTypes: GET_DELIVERY_REQUEST,
    options: deliveryRequestSequenceOptions,
  });

export const createPatientStatusNotificationModalEpic = () => (
  action$,
  store,
) =>
  action$
    .ofType(GET_LAST_DELIVERY_STATUS_REQUEST.SUCCESS)
    .filter(({ payload }) => shouldTriggerNotificationModal(payload))
    .map(({ payload }) =>
      createModal({
        key: MODAL_TYPES.CUSTOM,
        data: {
          customComponent: payload.customComponent,
        },
      }),
    );

export const saveDeliveryEpic = saveDeliveryService =>
  requestSequence({
    service: saveDeliveryService,
    actionTypes: SAVE_DELIVERY_REQUEST,
    options: deliveryRequestSequenceOptions,
  });

export const setDeliveryStatusEpic = setDeliveryStatusService =>
  requestSequence({
    service: setDeliveryStatusService,
    actionTypes: SET_DELIVERY_STATUS_REQUEST,
    options: { delay: true },
  });

export const onDeliveryStatusChangeFetchStripStockEpic = () => (
  action$,
  state,
) =>
  action$
    .ofType(SAVE_DELIVERY_REQUEST.SUCCESS, GET_DELIVERY_STATUS_REQUEST.SUCCESS)
    .map(({ payload }) => {
      const stripModelId = selectCurrentPrescriptionStripModel(
        state.getState(),
      );
      const patientId = pathOr(null, ['patientId'], payload);
      return getPatientStockRequest.start({ patientId, stripModelId });
    });

export const updateLastDeliveryStatusEpic = () => action$ =>
  action$
    .ofType(SAVE_DELIVERY_REQUEST.SUCCESS, SET_DELIVERY_STATUS_REQUEST.SUCCESS)
    .map(({ payload }) =>
      getDeliveryRequest.start({ patientId: payload.patientId }),
    );

export const saveDeliveryStatusCommentEpic = saveDeliveryStatusCommentService =>
  requestSequence({
    service: saveDeliveryStatusCommentService,
    actionTypes: SAVE_DELIVERY_STATUS_COMMENT_REQUEST,
  });
