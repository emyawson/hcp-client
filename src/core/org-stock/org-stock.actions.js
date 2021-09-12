import { createRequestActions } from 'src/core/request';

import {
  FETCH_ORG_STOCK_REQUEST,
  ADD_ORG_STOCK_REQUEST,
} from './org-stock.constants';

export const fetchOrgStockRequest = createRequestActions(
  FETCH_ORG_STOCK_REQUEST,
);

export const addOrgStockRequest = createRequestActions(ADD_ORG_STOCK_REQUEST);
