import { Config } from 'src/core';
import { createAuthHeader, deleteJSON } from 'src/utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const DeleteClinicGuideLoaderImpl = ({ clinicGuideId }, token) =>
  deleteJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/guides/custom/${clinicGuideId}`,
    {},
    {
      Authorization: createAuthHeader(token),
    },
  );

export const DeleteClinicGuideTransformImpl = data => data;

export const DeleteClinicGuideServiceImpl = (load, transform) => (
  query,
  token,
) => load(query, token).then(transform);
