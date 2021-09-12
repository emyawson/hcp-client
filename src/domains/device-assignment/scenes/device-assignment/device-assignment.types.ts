import { match } from 'react-router';
import { AssociationErrorType } from 'src/core/device-assignment';
import { DeviceInfo } from 'src/services/device-assignment';

import { SearchPatient } from '../select-patient/select-patient.types';

export type DeviceAssignmentBaseProps = {
  associatedPatientId?: number;
  associatedPatientName?: string;
  currentStep: number;
  dataIsUnavailable: boolean;
  deviceInfo: DeviceInfo;
  hasConfirmedDevice: boolean;
  isComplete: boolean;
  associationError: AssociationErrorType;
  updatingError: boolean;
  isUpdatingAssociation: boolean;
  selectedPatient: SearchPatient;
  shouldDisplayCreatePatientView: boolean;
};

export type DeviceAssignmentNavigationProps = {
  onCancel: () => void;
  onGoBack: () => void;
};

export type DeviceAssignmentQueryParams = {
  associationId: string;
};

export type DeviceAssignmentProps = DeviceAssignmentBaseProps & {
  onCancel: () => void;
  getDeviceAssociation: (associationId: string) => void;
  match: match<DeviceAssignmentQueryParams>;
};
