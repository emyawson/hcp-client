import { DeviceAssignmentProps } from '../device-assignment/device-assignment.types';

export type ConfirmAssignmentContainerProps = {
  readonly onCancel: () => void;
};

export type ConfirmAssignmentProps = ConfirmAssignmentContainerProps &
  DeviceAssignmentProps & {
    readonly onChangePatient: () => void;
    readonly onConfirmAssignment: () => void;
  };
