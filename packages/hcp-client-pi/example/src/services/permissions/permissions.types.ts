import { Permission } from 'src/core/permissions/permissions.types';

import { Service } from '../service.types';

export type PermissionOptions = {
  readonly patientId: string;
  readonly token: string;
};

export type PermissionData = Partial<Permission[]>;

export type PermissionsService = Service<PermissionOptions, PermissionData>;
