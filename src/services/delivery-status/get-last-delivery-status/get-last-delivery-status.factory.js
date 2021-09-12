import {
  GetLastDeliveryStatusServiceImpl,
  GetLastDeliveryStatusLoaderImpl,
  GetLastDeliveryStatusTransformImpl,
} from './get-last-delivery-status.service';
import { mockGetLastDeliveryStatusResponse } from './get-last-delivery-status.mock';

const mockLoader = () => Promise.resolve(mockGetLastDeliveryStatusResponse);

export const GetLastDeliveryStatusFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : GetLastDeliveryStatusLoaderImpl;
  return GetLastDeliveryStatusServiceImpl(
    loader,
    GetLastDeliveryStatusTransformImpl,
  );
};
