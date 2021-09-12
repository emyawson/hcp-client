import { Config } from 'src/core/env/config';
import { getJSON } from 'src/utils/service/service.utils';

import { EC6Patient } from '../patient.types';

import { GetPatientInfoParams } from './patient-info.types';

const { REACT_APP_EC6_API_ROOT } = Config;

export const getPatientInfoLoaderImpl = (
  { patientId }: GetPatientInfoParams,
  token: string,
) => {
  return getJSON(
    `${REACT_APP_EC6_API_ROOT}/eConecta/rest/api/patient/${patientId}`,
    {
      headers: { Authorization: token },
    },
  );
};

export const getPatientInfoTransformImpl = ({
  model,
}: {
  model: EC6Patient;
}) => {
  return model;
};

export const getPatientInfoServiceImpl = (load, transform) => (query, token) =>
  load(query, token).then(transform);
