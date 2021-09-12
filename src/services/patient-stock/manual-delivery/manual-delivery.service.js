import { Config } from 'src/core';
import { createAuthHeader, postJSON } from 'src/utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const ManualDeliveryLoaderImpl = (
  { patientId, stripModelId, numberOfStripsDelivered, comment },
  token,
) =>
  postJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients/${patientId}/strips-information/manual-delivery`,
    {
      stripModelId,
      numberOfStripsDelivered,
      comment,
    },
    {
      Authorization: createAuthHeader(token),
    },
  );

export const ManualDeliveryTransformImpl = results => results;

export const ManualDeliveryServiceImpl = (load, transform) => (query, token) =>
  load(query, token).then(transform);
