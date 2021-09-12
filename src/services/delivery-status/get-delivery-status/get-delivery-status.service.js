import { pipe } from 'ramda';

import { Config } from 'src/core';
import { createAuthHeader } from 'src/utils';
import { getJSON } from 'src/utils';

import { transformServerToClientDeliveryStatus } from '../delivery-status.util';
import { withQueryPatientId } from '../../transforms/query';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const GetDeliveryStatusLoaderImpl = ({ patientId }, token) =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients/${patientId}/delivery-status`,
    {},
    { Authorization: createAuthHeader(token) },
  );

export const GetDeliveryStatusTransformImpl = transformServerToClientDeliveryStatus;

export const GetDeliveryStatusServiceImpl = (load, transform) => (
  query,
  token,
) =>
  load(query, token).then(
    pipe(
      transform,
      withQueryPatientId(query),
    ),
  );
