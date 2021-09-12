import { Config } from 'src/core/env/config';
import { postJSON, stringifyBody } from 'src/utils/service/service.utils';

import {
  CreatePatientParams,
  CreatePatientResponse,
  EC6Model,
} from './create-patient.types';

const { REACT_APP_EC6_API_ROOT } = Config;

export const CreatePatientLoaderImpl = (
  { professionalId, patient }: CreatePatientParams,
  token: string,
) =>
  postJSON(
    `${REACT_APP_EC6_API_ROOT}/eConecta/rest/api/professional/${professionalId}/patient`,
    {
      headers: { Authorization: token },
      body: stringifyBody(patient),
    },
  );

export const CreatePatientTransformImpl = ({
  model,
}: CreatePatientResponse): EC6Model => model;

export const CreatePatientServiceImpl = (load, transform) => (query, token) =>
  load(query, token).then(transform);
