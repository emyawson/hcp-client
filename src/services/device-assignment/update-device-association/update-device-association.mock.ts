import { UpdateDeviceAssociationEC6SuccessResponse } from './update-device-association.types';

export const mockUpdateDeviceAssociationEC6Response: UpdateDeviceAssociationEC6SuccessResponse = {
  resultDescription: 'assingDeviceToPatientOk',
  model: 'SUCCESS',
};

export const mockUpdateDeviceAssociationEC6AlreadyAssignedResponse = {
  resultDescription: 'ASSOCIATION_ALREADY_ASSIGNED',
  error: [
    {
      error:
        'checkAssociationAssign | start | associationId: 6eab80ef-87e0-43c6-be83-08bb7fc5f8e6',
    },
  ],
};
