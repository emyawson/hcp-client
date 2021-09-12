import { Permission } from 'src/core/permissions/permissions.types';

export type WithPermissionComponentState = {
  isVerifying: boolean;
};
export type WithPermissionComponentProps = {
  readonly hasAccess: boolean;
  readonly patientId?: string;
  readonly currentPermissions: Partial<Permission[]>;
  readonly onRender: (props?: any) => React.ReactNode;
  readonly onAccessDenied: (props?: any) => React.ReactNode;
  readonly onVerification: (props?: any) => React.ReactNode;
};

export type WithPermissionContainerProps = {
  readonly hasPermissions: Permission[];
  readonly currentPermissions: Partial<Permission[]>;
};

export type WithPermissionProps = {
  readonly hasPermissions: Permission[];
  readonly patientId?: string;
  readonly onRender?: (props?: WithPermissionContainerProps) => React.ReactNode;
  readonly onAccessDenied?: (
    props?: WithPermissionContainerProps,
  ) => React.ReactNode;
  readonly onVerification?: (
    props?: WithPermissionContainerProps,
  ) => React.ReactNode;
};
