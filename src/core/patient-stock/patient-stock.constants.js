import { addDomainNamespace } from 'src/utils/domain-namespace';

import { createRequestActionTypes } from '../request/request.actions';

const DOMAIN_NAMESPACE = 'PATIENT_STOCK';
const addNamespacing = actionName =>
  addDomainNamespace(actionName, DOMAIN_NAMESPACE);

export const GET_PATIENT_STOCK = addNamespacing('GET_PATIENT_STOCK');
export const GET_PATIENT_STOCK_REQUEST = createRequestActionTypes(
  GET_PATIENT_STOCK,
);

export const SUBMIT_LOST_STRIPS = addNamespacing('SUBMIT_LOST_STRIPS');
export const SUBMIT_LOST_STRIPS_REQUEST = createRequestActionTypes(
  SUBMIT_LOST_STRIPS,
);

export const SUBMIT_MANUAL_DELIVERY = addNamespacing('SUBMIT_MANUAL_DELIVERY');
export const SUBMIT_MANUAL_DELIVERY_REQUEST = createRequestActionTypes(
  SUBMIT_MANUAL_DELIVERY,
);
