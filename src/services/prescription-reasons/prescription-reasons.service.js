import { Config } from 'src/core';
import { createAuthHeader, getJSON } from 'src/utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const PrescriptionReasonsLoaderImpl = (params, token) =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/prescription-reasons`,
    {},
    {
      Authorization: createAuthHeader(token),
    },
  );

export const PrescriptionReasonsTransform = results => results;

export const PrescriptionReasonsServiceImpl = (load, transform) => (
  query,
  token,
) => load(query, token).then(transform);
