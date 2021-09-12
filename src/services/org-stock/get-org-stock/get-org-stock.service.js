import { Config } from 'src/core';
import { createAuthHeader, getJSON } from 'src/utils';

import { serverToClientStripModelStocks } from '../org-stock.utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const GetOrgStockLoaderImpl = ({ clinicId }, token) =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/organization-stock/${clinicId}`,
    {},
    {
      Authorization: createAuthHeader(token),
    },
  );

export const GetOrgStockTransform = ({ totalStock, lastShipments }) => ({
  aggregateStripStock: totalStock,
  stripModelStocks: serverToClientStripModelStocks(lastShipments),
});

export const GetOrgStockServiceImpl = (load, transform) => (query, token) =>
  load(query, token).then(transform);
