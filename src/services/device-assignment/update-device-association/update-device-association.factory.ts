import { mockUpdateDeviceAssociationEC6Response } from './update-device-association.mock';
import {
  UpdateDeviceAssociationLoaderImpl,
  UpdateDeviceAssociationServiceFactoryImpl,
  UpdateDeviceAssociationTransformImpl,
} from './update-device-association.service';
import { UpdateDeviceAssociationServiceFactory } from './update-device-association.types';

const mockLoader = () =>
  Promise.resolve(mockUpdateDeviceAssociationEC6Response);

export const UpdateDeviceAssociationFactoryImpl: UpdateDeviceAssociationServiceFactory = ({
  devMode,
}) => {
  const loader = devMode ? mockLoader : UpdateDeviceAssociationLoaderImpl;
  return UpdateDeviceAssociationServiceFactoryImpl(
    loader,
    UpdateDeviceAssociationTransformImpl,
  );
};
