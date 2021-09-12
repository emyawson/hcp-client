import { Config } from 'src/core';
import { createAuthHeader, postJSON } from 'src/utils';

import { serverToClientStripModelStocks } from '../org-stock.utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const AddOrgStockLoaderImpl = (
  { clinicId, stripModelId, actionPerformedAt, numberOfStrips },
  token,
) =>
  postJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/organization-stock/${clinicId}/strips-received`,
    {
      stripModelId,
      actionPerformedAt,
      numberOfStrips,
    },
    {
      Authorization: createAuthHeader(token),
    },
  );

export const AddOrgStockTransform = ({ totalStock, lastShipments }) => ({
  aggregateStripStock: totalStock,
  stripModelStocks: serverToClientStripModelStocks(lastShipments),
});

export const AddOrgStockServiceImpl = (load, transform) => (query, token) =>
  load(query, token).then(transform);
