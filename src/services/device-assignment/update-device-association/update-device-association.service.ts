import { getJSON } from 'src/utils/service';

import { Config } from '../../../core/index';

import {
  Ec6UpdateAssociationResultDescription,
  UpdateDeviceAssociationServiceType,
  UpdateDeviceAssociationTransform,
} from './update-device-association.types';

const { REACT_APP_EC6_API_ROOT } = Config;

export const UpdateDeviceAssociationLoaderImpl: UpdateDeviceAssociationServiceType = (
  { patientId, associationId },
  token: string,
) =>
  getJSON(
    `${REACT_APP_EC6_API_ROOT}/Patients/${patientId}/Associations/${associationId}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );

export const UpdateDeviceAssociationTransformImpl: UpdateDeviceAssociationTransform = result => {
  if (
    result.resultDescription ===
    Ec6UpdateAssociationResultDescription.assingDeviceToPatientOk
  ) {
    return { success: true };
  }
  switch (result.resultDescription) {
    case Ec6UpdateAssociationResultDescription.assingDeviceToPatientOk:
    case Ec6UpdateAssociationResultDescription.ASSOCIATION_NOT_FOUND:
      return { success: false, errorReason: 'invalid-association-id' };
    case Ec6UpdateAssociationResultDescription.ASSOCIATION_ALREADY_ASSIGNED:
      return { success: false, errorReason: 'already-assigned' };
    default:
      return { success: false, errorReason: 'unexpected-error' };
  }
};

export const UpdateDeviceAssociationServiceFactoryImpl = (load, transform) => (
  query,
  token,
) => load(query, token).then(transform);
