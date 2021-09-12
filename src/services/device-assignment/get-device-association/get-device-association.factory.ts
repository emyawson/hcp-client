import {
  GetDeviceAssociationLoaderImpl,
  GetDeviceAssociationServiceFactoryImpl,
  GetDeviceAssociationTransformImpl,
} from './get-device-association.service';

import { mockDeviceAssociation } from './get-device-association.mock';

const mockLoader = () => Promise.resolve(mockDeviceAssociation);

export const GetDeviceAssociationFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : GetDeviceAssociationLoaderImpl;
  return GetDeviceAssociationServiceFactoryImpl(
    loader,
    GetDeviceAssociationTransformImpl,
  );
};
