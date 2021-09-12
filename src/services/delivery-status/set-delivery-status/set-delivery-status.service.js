import { pipe } from 'ramda';

import { Config } from 'src/core';
import { createAuthHeader, postJSON } from 'src/utils';

import {
  transformStatusToServerDeliveryStatus,
  transformServerToClientDeliveryStatus,
} from '../delivery-status.util';
import { withQueryPatientId } from '../../transforms/query';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;
export const SetDeliveryStatusLoaderImpl = (
  { patientId, status, comment },
  token,
) =>
  postJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients/${patientId}/delivery-status`,
    transformStatusToServerDeliveryStatus({ status, comment }),
    {
      Authorization: createAuthHeader(token),
    },
  );

export const SetDeliveryStatusTransformImpl = transformServerToClientDeliveryStatus;
export const SetDeliveryStatusServiceImpl = (post, transform) => (
  query,
  token,
) =>
  post(query, token).then(
    pipe(
      transform,
      withQueryPatientId(query),
    ),
  );
