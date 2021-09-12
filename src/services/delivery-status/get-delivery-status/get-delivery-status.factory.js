import {
  GetDeliveryStatusServiceImpl,
  GetDeliveryStatusLoaderImpl,
  GetDeliveryStatusTransformImpl,
} from './get-delivery-status.service';
import { mockGetDeliveryStatusResponse } from './get-delivery-status.mock';

const mockLoader = () => Promise.resolve(mockGetDeliveryStatusResponse);

export const GetDeliveryStatusFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : GetDeliveryStatusLoaderImpl;
  return GetDeliveryStatusServiceImpl(loader, GetDeliveryStatusTransformImpl);
};
