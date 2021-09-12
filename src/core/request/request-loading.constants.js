import { translate } from 'src/i18n';
import { SAVE_ALERTS } from 'src/core/alerts/alerts.constants';
import { ADD_ORG_STOCK } from 'src/core/org-stock/org-stock.constants';
import {
  SUBMIT_LOST_STRIPS,
  SUBMIT_MANUAL_DELIVERY,
} from 'src/core/patient-stock/patient-stock.constants';
import {
  SAVE_PRESCRIPTION,
  DELETE_CLINIC_GUIDE,
  SAVE_CLINIC_GUIDE,
} from 'src/core/prescription/prescription.constants';
import {
  SAVE_DELIVERY,
  GET_DELIVERY_STATUS,
  SET_DELIVERY_STATUS,
  SAVE_DELIVERY_STATUS_COMMENT,
} from 'src/core/strip-delivery/strip-delivery.constants';

export const REQUESTS_WITH_GLOBAL_LOADER = [
  SAVE_ALERTS,
  SAVE_PRESCRIPTION,
  SAVE_DELIVERY,
  GET_DELIVERY_STATUS,
  SET_DELIVERY_STATUS,
  SUBMIT_LOST_STRIPS,
  SUBMIT_MANUAL_DELIVERY,
  ADD_ORG_STOCK,
  SAVE_DELIVERY_STATUS_COMMENT,
  DELETE_CLINIC_GUIDE,
  SAVE_CLINIC_GUIDE,
];

export const REQUEST_LOADING_MESSAGES = {
  default: translate('requestsLoading.default'),
  [SAVE_ALERTS]: translate('requestsLoading.saveAlerts'),
  [SAVE_PRESCRIPTION]: translate('requestsLoading.savePrescription'),
  [SAVE_DELIVERY]: translate('requestsLoading.saveDelivery'),
  [GET_DELIVERY_STATUS]: translate('requestsLoading.getDeliveryStatus'),
  [SET_DELIVERY_STATUS]: translate('requestsLoading.setDeliveryStatus'),
  [SUBMIT_LOST_STRIPS]: translate('requestsLoading.submitLostStrips'),
  [SUBMIT_MANUAL_DELIVERY]: translate('requestsLoading.submitManualDelivery'),
  [ADD_ORG_STOCK]: translate('requestsLoading.addOrgStock'),
  [SAVE_DELIVERY_STATUS_COMMENT]: translate('requestsLoading.default'),
};

export const REQUEST_SUCCESS_MESSAGES = {
  default: translate('requestsLoading.complete'),
  [DELETE_CLINIC_GUIDE]: translate(
    'prescription.customClinicGuides.modal.successfulMessage',
  ),
};

export const REQUESTS_DESTROY_MODAL_ON_SUCCESS = [SAVE_DELIVERY_STATUS_COMMENT];

export const REQUESTS_REQUIRE_CONFIRMATION_ON_SUCCESS = [DELETE_CLINIC_GUIDE];
