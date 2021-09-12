import { Config } from 'src/core';
import { createAuthHeader, postJSON } from 'src/utils';

import {
  transformJSONToPrescription,
  transformPrescriptionToJSONWithSanitization,
} from '../prescription.util';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const SavePrescriptionLoaderImpl = (
  { patientId, prescription },
  token,
) =>
  postJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients/${patientId}/prescriptions/`,
    transformPrescriptionToJSONWithSanitization(prescription),
    {
      Authorization: createAuthHeader(token),
    },
  );

export const SavePrescriptionTransformImpl = transformJSONToPrescription;

export const SavePrescriptionServiceImpl = (load, transform) => (
  query,
  token,
) => load(query, token).then(transform);
