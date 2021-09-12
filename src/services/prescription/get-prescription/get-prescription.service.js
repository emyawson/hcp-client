import { Config } from 'src/core';
import { createAuthHeader, getJSON } from 'src/utils';

import { transformJSONToPrescriptions } from '../prescription.util';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const GetPrescriptionLoaderImpl = ({ patientId }, token) =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients/${patientId}/prescriptions/current`,
    {},
    {
      Authorization: createAuthHeader(token),
    },
  );

export const GetPrescriptionTransformImpl = transformJSONToPrescriptions;

export const GetPrescriptionServiceImpl = (load, transform) => (query, token) =>
  load(query, token).then(transform);
