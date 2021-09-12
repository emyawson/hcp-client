import { Config } from 'src/core';
import { createAuthHeader, getJSON } from 'src/utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const DTCLoaderImpl = (payload, token) =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/downloads/dtc-installer`,
    {},
    {
      Authorization: createAuthHeader(token),
    },
  );

export const DTCTransformImpl = data => data;

export const DTCServiceImpl = (loader, transform) => (query, token) =>
  loader(query, token).then(transform);
