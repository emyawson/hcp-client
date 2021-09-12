import { Config } from 'src/core';
import { createAuthHeader, postJSON } from 'src/utils';
import { transformClientToServerTrafficLightStatus } from 'src/services/delivery-status/delivery-status.util';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const SaveDeliveryLoaderImpl = (
  { patientId, numberOfStrips, stripModelId, trafficLightStatus, forced },
  token,
) =>
  postJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients/${patientId}/delivery`,
    {
      numberOfStrips,
      stripModelId,
      trafficLightStatus: transformClientToServerTrafficLightStatus(
        trafficLightStatus,
      ),
      forced,
    },
    {
      Authorization: createAuthHeader(token),
    },
  );

export const SaveDeliveryTransformImpl = ({
  id,
  dateCalculated,
  prescriptionId,
  stripsDelivered,
  patientId,
}) => ({
  id,
  lastCollectedDate: dateCalculated,
  prescriptionId,
  numberOfStripsToDeliver: stripsDelivered,
  patientId,
});

export const SaveDeliveryServiceImpl = (post, transform) => (params, token) =>
  post(params, token).then(transform);
