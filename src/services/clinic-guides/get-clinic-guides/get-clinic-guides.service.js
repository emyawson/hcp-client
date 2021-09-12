import { toUpper, map } from 'ramda';

import { Config } from 'src/core';
import { createAuthHeader, getJSON } from 'src/utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const GetClinicGuidesLoaderImpl = ({ therapyId }, token) =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/guides`,
    {
      therapyId,
    },
    {
      Authorization: createAuthHeader(token),
    },
  );

export const GetClinicGuidesTransformImpl = map(({ type, ...data }) => ({
  type: toUpper(type),
  ...data,
}));

export const GetClinicGuidesServiceImpl = (load, transform) => (query, token) =>
  load(query, token).then(transform);
