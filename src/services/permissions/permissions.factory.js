import {
  PermissionsService,
  PermissionsServiceLoaderImpl,
  PatientPermissionsServiceLoaderImpl,
  transformPermissions,
} from './permissions.service';
import { mockPermissions } from './permissions.mock';

const mockPermissionsLoader = () =>
  new Promise(res => {
    setTimeout(() => res(mockPermissions), 2000);
  });

const factories = {
  permissions: PermissionsServiceLoaderImpl,
  patient: PatientPermissionsServiceLoaderImpl,
  devMode: mockPermissionsLoader,
};

export const PermissionsFactory = ({ devMode, type = 'permissions' }) => {
  const loader = devMode ? factories.devMode : factories[type];
  return PermissionsService(loader, transformPermissions);
};
