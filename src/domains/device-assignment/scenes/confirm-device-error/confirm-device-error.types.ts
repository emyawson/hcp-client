import {
  DeviceAssignmentBaseProps,
  DeviceAssignmentNavigationProps,
} from '../device-assignment/device-assignment.types';

export type ConfirmDeviceErrorProps = DeviceAssignmentBaseProps &
  DeviceAssignmentNavigationProps & {
    associatedPatientName: string;
  };
