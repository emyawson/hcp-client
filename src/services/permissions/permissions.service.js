import { getJSON, createAuthHeader } from 'src/utils';
import { Config } from 'src/core';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const PermissionsServiceLoaderImpl = (params, token) =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/permissions`,
    {},
    {
      Authorization: createAuthHeader(token),
    },
  );

export const PatientPermissionsServiceLoaderImpl = ({ patientId }, token) =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients/${patientId}/permissions`,
    {},
    {
      Authorization: createAuthHeader(token),
    },
  );

export const transformPermissions = userPermissions => userPermissions;

export const PermissionsService = (load, transform) => (query, token) =>
  load(query, token).then(transform);
