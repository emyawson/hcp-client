import { Config } from 'src/core';
import { createAuthHeader } from 'src/utils';
import { getJSON } from 'src/utils';

import { transformServerToClientDeliveryStatus } from '../delivery-status.util';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const GetLastDeliveryStatusLoaderImpl = ({ patientId }, token) =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients/${patientId}/delivery-status/last`,
    {},
    { Authorization: createAuthHeader(token) },
  );

export const GetLastDeliveryStatusTransformImpl = status => {
  const {
    trafficLightStatus,
    trafficLightStatusConditions,
    trafficLightStatusComment,
    trafficLightStatusCommentState,
    numberOfStripsToDeliver,
    trafficLightStatusDateCalculated,
  } = transformServerToClientDeliveryStatus(status);
  return {
    lastTrafficLightStatus: trafficLightStatus,
    lastTrafficLightStatusConditions: trafficLightStatusConditions,
    lastTrafficLightStatusComment: trafficLightStatusComment,
    lastTrafficLightStatusCommentState: trafficLightStatusCommentState,
    lastNumberOfStripsToDeliver: numberOfStripsToDeliver,
    lastTrafficLightStatusDateCalculated: trafficLightStatusDateCalculated,
  };
};

export const GetLastDeliveryStatusServiceImpl = (load, transform) => (
  query,
  token,
) => load(query, token).then(transform);
