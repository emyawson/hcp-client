import { addDomainNamespace } from 'src/utils/domain-namespace';

import { createRequestActionTypes } from '../request/request.actions';

const DOMAIN_NAMESPACE = 'ORG_STOCK';
const addNamespacing = actionName =>
  addDomainNamespace(actionName, DOMAIN_NAMESPACE);

export const FETCH_ORG_STOCK = addNamespacing('FETCH_ORG_STOCK');
export const FETCH_ORG_STOCK_REQUEST = createRequestActionTypes(
  FETCH_ORG_STOCK,
);

export const ADD_ORG_STOCK = addNamespacing('ADD_ORG_STOCK');

export const ADD_ORG_STOCK_REQUEST = createRequestActionTypes(ADD_ORG_STOCK);
