import { requestSequence } from 'src/core/request';

import {
  FETCH_ORG_STOCK_REQUEST,
  ADD_ORG_STOCK_REQUEST,
} from './org-stock.constants';

export const fetchOrgStockEpic = fetchStripModelsService =>
  requestSequence({
    actionTypes: FETCH_ORG_STOCK_REQUEST,
    service: fetchStripModelsService,
  });

export const addOrgStockEpic = addOrgStockService =>
  requestSequence({
    actionTypes: ADD_ORG_STOCK_REQUEST,
    options: {
      delay: true,
    },
    service: addOrgStockService,
  });
