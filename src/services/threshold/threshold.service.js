import { Config } from 'src/core';
import { createAuthHeader, getJSON } from 'src/utils';

import { transformServerThresholdsToThresholds } from './threshold.util';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const ThresholdTransformImpl = transformServerThresholdsToThresholds;

export const ThresholdLoaderImpl = ({ patientId }, token) =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients/${patientId}/glucose-thresholds`,
    {},
    { Authorization: createAuthHeader(token) },
  );

export const ThresholdServiceImpl = (load, transform) => (query, token) =>
  load(query, token).then(transform);
