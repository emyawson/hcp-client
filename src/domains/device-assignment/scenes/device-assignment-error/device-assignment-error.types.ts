import {
  DeviceAssignmentBaseProps,
  DeviceAssignmentNavigationProps,
} from '../device-assignment/device-assignment.types';

export type DeviceAssignmentErrorProps = DeviceAssignmentBaseProps &
  DeviceAssignmentNavigationProps & {
    readonly heading: string | React.ReactNode;
    readonly subheading: string | React.ReactNode;
    readonly children: React.ReactElement<any>;
  };
