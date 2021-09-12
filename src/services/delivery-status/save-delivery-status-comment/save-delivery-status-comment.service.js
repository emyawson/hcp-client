import { Config } from 'src/core';
import { createAuthHeader } from 'src/utils';
import { postJSON } from 'src/utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const SaveDeliveryStatusCommentLoaderImpl = (
  { patientId, deliveryStatusId, comment },
  token,
) =>
  postJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients/${patientId}/delivery-status/comment`,
    {
      id: deliveryStatusId,
      comment,
    },
    { Authorization: createAuthHeader(token) },
  );

export const SaveDeliveryStatusCommentTransformImpl = ({
  comment,
  createdAt,
  id,
}) => ({
  trafficLightStatusComment: comment,
  trafficLightStatusDateCalculated: createdAt,
  trafficLightStatusId: id,
});

export const SaveDeliveryStatusCommentServiceImpl = (load, transform) => (
  query,
  token,
) => load(query, token).then(transform);
