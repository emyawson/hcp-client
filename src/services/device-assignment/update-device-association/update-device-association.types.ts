export const Ec6UpdateAssociationResultDescription = {
  assingDeviceToPatientOk: 'assingDeviceToPatientOk',
  ASSOCIATION_ALREADY_ASSIGNED: 'ASSOCIATION_ALREADY_ASSIGNED',
  ASSOCIATION_NOT_FOUND: 'ASSOCIATION_NOT_FOUND',
  PATIENT_NOT_FOUND: 'PATIENT_NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  MANDATORY_FIELD_MISSING: 'MANDATORY_FIELD_MISSING',
  BAD_CREDENTIALS: 'BAD_CREDENTIALS',
};

export type UpdateDeviceAssociationParams = {
  associationId: string;
  patientId: number;
};

export type UpdateDeviceAssociationEC6SuccessResponse = {
  resultDescription: 'assingDeviceToPatientOk';
  model: 'SUCCESS';
};

export type UpdateDeviceAssociationEC6AlreadyAssignedResponse = {
  resultDescription: 'ASSOCIATION_ALREADY_ASSIGNED';
  error: [{ error: string }];
};

export type UpdateDeviceAssociationEC6GenericErrorResponse = {
  resultDescription: string;
  error: [{ error: string }];
};

export type UpdateDeviceAssociationResponse = {
  success: boolean;
  errorReason?:
    | 'already-assigned'
    | 'invalid-association-id'
    | 'unexpected-error';
};

export type UpdateDeviceAssociationTransform = (
  data:
    | UpdateDeviceAssociationEC6GenericErrorResponse
    | UpdateDeviceAssociationEC6AlreadyAssignedResponse
    | UpdateDeviceAssociationEC6SuccessResponse,
) => UpdateDeviceAssociationResponse;

export type UpdateDeviceAssociationServiceFactory = (
  load,
  transform: UpdateDeviceAssociationTransform,
) => UpdateDeviceAssociationServiceType;

export type UpdateDeviceAssociationServiceType = (
  query: UpdateDeviceAssociationParams,
  token: string,
) => Promise<UpdateDeviceAssociationResponse>;
