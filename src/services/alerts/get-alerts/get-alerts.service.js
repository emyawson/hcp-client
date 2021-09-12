import { Config } from 'src/core';
import { createAuthHeader, getJSON } from 'src/utils';

import { transformServerAlertsToAlerts } from '../alerts.utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const GetAlertsLoaderImpl = ({ patientId }, token) =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients/${patientId}/glucose-alerts`,
    {},
    {
      Authorization: createAuthHeader(token),
    },
  );

export const GetAlertsTransformImpl = transformServerAlertsToAlerts;

export const GetAlertsServiceImpl = (load, transform) => (query, token) =>
  load(query, token).then(transform);
