import { Config } from 'src/core';
import { createAuthHeader, postJSON } from 'src/utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const SaveClinicGuideLoaderImpl = (
  { therapyId, name, period, maximumStrips, minimumStrips },
  token,
) =>
  postJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/guides/custom`,
    {
      therapyId,
      name,
      period,
      maximumStrips,
      minimumStrips,
    },
    {
      Authorization: createAuthHeader(token),
    },
  );

export const SaveClinicGuideTransformImpl = data => data;

export const SaveClinicGuideServiceImpl = (load, transform) => (query, token) =>
  load(query, token).then(transform);
