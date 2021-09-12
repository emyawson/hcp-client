import { Config } from 'src/core';
import { createAuthHeader, getJSON } from 'src/utils';

import { serverToClientDiabetesType } from './patient.util';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const PatientLoaderImpl = ({ patientId }, token) =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients/${patientId}`,
    {},
    {
      Authorization: createAuthHeader(token),
    },
  );

export const PatientTransformImpl = ({
  id,
  user: { name, surname, surname2, dateOfBirth },
  treatment,
  patientDetails: { diabetesType, healthCareSystemId, timeZone },
  devices,
  center,
}) => ({
  id,
  healthCareSystemId,
  firstName: name,
  surName: surname,
  surName2: surname2,
  dateOfBirth,
  diabetesType: serverToClientDiabetesType(diabetesType),
  treatmentName: treatment.name,
  centerName: center.name,
  timezone: timeZone,
  devices,
});

export const PatientServiceImpl = (load, transform) => (query, token) =>
  load(query, token).then(transform);
