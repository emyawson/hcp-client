import { Config } from 'src/core';
import { createAuthHeader, getJSON } from 'src/utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const GetPatientStockLoaderImpl = ({ patientId, stripModelId }, token) =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients/${patientId}/strips-information`,
    { stripModelId },
    {
      Authorization: createAuthHeader(token),
    },
  );

export const GetPatientStockTransformImpl = results => ({
  stock: results.patientStock,
});

export const GetPatientStockServiceImpl = (load, transform) => (query, token) =>
  load(query, token).then(transform);
