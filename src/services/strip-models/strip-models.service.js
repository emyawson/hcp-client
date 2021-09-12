import { Config } from 'src/core';
import { createAuthHeader, getJSON } from 'src/utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const StripModelsLoaderImpl = ({ clinicId, departmentId }, token) =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/strip-models`,
    {
      centerId: clinicId,
      departmentId,
    },
    {
      Authorization: createAuthHeader(token),
    },
  );

export const StripModelsTransform = results => results;

export const StripModelsServiceImpl = (load, transform) => (query, token) =>
  load(query, token).then(transform);
