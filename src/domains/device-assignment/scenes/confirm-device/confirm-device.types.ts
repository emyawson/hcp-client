import { DeviceAssignmentBaseProps } from '../device-assignment/device-assignment.types';

export type ConfirmDeviceContainerProps = {
  readonly onCancel: () => void;
};
export type ConfirmDeviceProps = ConfirmDeviceContainerProps &
  DeviceAssignmentBaseProps & {
    readonly onConfirmDevice: () => void;
    toolTip: {
      x: number;
      y: number;
    };
    showToolTip: () => void;
    hideToolTip: () => void;
  };
