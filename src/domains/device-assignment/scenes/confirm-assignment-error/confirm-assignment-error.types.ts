import {
  DeviceAssignmentBaseProps,
  DeviceAssignmentNavigationProps,
} from '../device-assignment/device-assignment.types';

export type ConfirmAssignmentErrorContainerProps = {};

export type ConfirmAssignmentErrorProps = ConfirmAssignmentErrorContainerProps &
  DeviceAssignmentBaseProps &
  DeviceAssignmentNavigationProps & {
    email: string;
    phone: string;
  };
