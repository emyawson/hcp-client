import { Config } from 'src/core';
import { createAuthHeader } from 'src/utils';
import { getJSON } from 'src/utils';

import { trafficLightColorToStatus } from '../../delivery-status/delivery-status.util';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const GetDeliveryLoaderImpl = ({ patientId }, token) =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients/${patientId}/delivery`,
    {},
    {
      Authorization: createAuthHeader(token),
    },
  );

export const GetDeliveryTransformImpl = ({
  id,
  lastCollectedDate,
  prescriptionId,
  stripModelId,
  stripsDelivered,
  trafficLightStatus,
}) => ({
  id,
  lastCollectedDate,
  prescriptionId,
  stripModelId,
  stripsDelivered,
  lastDeliveryTrafficLightStatus:
    trafficLightColorToStatus[trafficLightStatus.status],
});

export const GetDeliveryServiceImpl = (load, transform) => (query, token) =>
  load(query, token).then(transform);
