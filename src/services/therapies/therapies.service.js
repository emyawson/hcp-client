import { Config } from 'src/core';
import { createAuthHeader, getJSON } from 'src/utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const TherapiesLoaderImpl = (therapies, token) =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/therapies`,
    {},
    {
      Authorization: createAuthHeader(token),
    },
  );

export const TherapiesTransformImpl = results => results;

export const TherapiesServiceImpl = (load, transform) => (query, token) =>
  load(query, token).then(transform);
