import { Config } from 'src/core';
import { createAuthHeader, getJSON, formatDateString } from 'src/utils';

import { buildQueryString } from '../../utils/query-params';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const PatientSearchLoaderImpl = ({ patientID, fullName }, token) => {
  const query = buildQueryString(
    { patientID: patientID.trim(), fullName: fullName.trim() },
    { patientID: 'healthCareId', fullName: 'search' },
  );
  return getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients?${query}`,
    {},
    { Authorization: createAuthHeader(token) },
  );
};

export const PatientSearchTransformImpl = results =>
  results.map(d => ({
    id: d.id,
    healthCareSystemId: d.healthCareSystemId,
    fullName: d.fullname,

    birthDate: formatDateString({
      dateString: d.dateOfBirth,
      format: 'dd/LL/yyyy',
      timeZone: 'Etc/GMT+0',
    }),
    treatment: d.treatmentName,
    diabetesType: d.diabetesType,
  }));

export const PatientSearchServiceImpl = (load, transform) => (query, token) =>
  load(query, token).then(transform);
