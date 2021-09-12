import { Config } from 'src/core';
import { createAuthHeader, getJSON } from 'src/utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const PatientListLoaderImpl: PatientListLoader = token =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients/`,
    {},
    {
      Authorization: createAuthHeader(token),
    },
  );

export const PatientListTransformImpl: PatientListTransform = results =>
  results.map(({ id, name, surname, surname2 }) => ({
    id,
    firstName: name,
    surName: surname,
    surName2: surname2,
  }));

export const PatientListServiceImpl: PatientListService = (
  load,
  transform,
) => token => load(token).then(transform);
