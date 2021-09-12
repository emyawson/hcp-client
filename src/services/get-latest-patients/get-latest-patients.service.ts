import { getJSON } from '../../utils/service';
import { dissoc } from 'ramda';
import { Config } from '../../core';
import {
  GetLatestPatientsTransform,
  GetLatestPatientsServiceFactoryType,
  GetLatestPatientsServiceType,
} from './get-latest-patients.types';

const { REACT_APP_EC6_API_ROOT } = Config;

export const GetLatestPatientsLoaderImpl: GetLatestPatientsServiceType = (
  { professionalId },
  token: string,
) =>
  getJSON(
    `${REACT_APP_EC6_API_ROOT}/Practitioners/${professionalId}/Patients/latest`,
    {
      headers: {
        Authorization: token,
      },
    },
  );

export const GetLatestPatientsTransformImpl: GetLatestPatientsTransform = data =>
  data.model;

export const GetLatestPatientsServiceFactoryImpl: GetLatestPatientsServiceFactoryType = (
  load,
  transform,
) => (query, token) => load(query, token).then(transform);
