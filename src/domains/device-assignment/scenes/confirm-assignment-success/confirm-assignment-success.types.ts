import { DeviceAssignmentBaseProps } from '../device-assignment/device-assignment.types';

export type ConfirmAssignmentSuccessContainerProps = {};

export type ConfirmAssignmentSuccessProps = ConfirmAssignmentSuccessContainerProps &
  DeviceAssignmentBaseProps & {
    onComplete: () => void;
  };
