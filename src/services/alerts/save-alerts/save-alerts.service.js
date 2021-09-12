import { Config } from 'src/core';
import { createAuthHeader, putJSON } from 'src/utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const SaveAlertsTransformImpl = value => value;

export const SaveAlertsLoaderImpl = ({ patientId, alerts }, token) =>
  putJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients/${patientId}/glucose-alerts`,
    alerts,
    {
      Authorization: createAuthHeader(token),
    },
  );

export const SaveAlertsServiceImpl = (put, transform) => (query, token) =>
  put(query, token).then(transform);
