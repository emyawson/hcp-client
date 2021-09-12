import { Config } from 'src/core';
import { createAuthHeader, getJSON } from 'src/utils';

import { frequencyToString } from './frequencies.utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const FrequenciesLoaderImpl = ({ centerId }, token) =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/frequencies`,
    { centerId },
    {
      Authorization: createAuthHeader(token),
    },
  );

export const FrequenciesTransformImpl = results =>
  results.map(({ id, name, frequency }) => ({
    id: frequencyToString(frequency),
    name,
  }));

export const FrequenciesServiceImpl = (load, transform) => (query, token) =>
  load(query, token).then(transform);
