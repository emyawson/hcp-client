import { Config } from 'src/core';
import { createAuthHeader, getJSON } from 'src/utils';

import { serverToClientDiabetesType } from '../patient.util';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const GetPatientSummaryLoaderImpl = ({ patientId }, token) =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients/${patientId}/summary`,
    {},
    {
      Authorization: createAuthHeader(token),
    },
  );

export const GetPatientSummaryTransformImpl = ({
  id,
  name,
  surname,
  surname2,
  dateOfBirth,
  treatmentName,
  diabetesType,
  centerId,
  profileId,
  departmentId,
  healthCareSystemId,
  centerName,
}) => ({
  id,
  dateOfBirth,
  treatmentName,
  profileId,
  departmentId,
  healthCareSystemId,
  centerName,
  firstName: name,
  surName: surname,
  surName2: surname2,
  diabetesType: serverToClientDiabetesType(diabetesType),
});

export const GetPatientSummaryServiceImpl = (load, transform) => (
  query,
  token,
) => load(query, token).then(transform);
