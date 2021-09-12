import { dissoc } from 'ramda';
import { Config } from 'src/core';
import { getJSON } from 'src/utils/service';

import {
  GetDeviceAssociationServiceFactoryType,
  GetDeviceAssociationServiceType,
  GetDeviceAssociationTransform,
} from './get-device-association.types';

const { REACT_APP_EC6_API_ROOT } = Config;

export const GetDeviceAssociationLoaderImpl: GetDeviceAssociationServiceType = (
  { associationId },
  token: string,
) =>
  getJSON(`${REACT_APP_EC6_API_ROOT}/Associations/${associationId}/device`, {
    headers: {
      Authorization: token,
    },
  }).then(response => ({ ...response, associationId }));

export const GetDeviceAssociationTransformImpl: GetDeviceAssociationTransform = data => ({
  patientId: data.model.patientId,
  deviceInfo: dissoc('patientId', data.model),
  associationId: data.associationId,
});

export const GetDeviceAssociationServiceFactoryImpl: GetDeviceAssociationServiceFactoryType = (
  load,
  transform,
) => (query, token) => load(query, token).then(transform);
