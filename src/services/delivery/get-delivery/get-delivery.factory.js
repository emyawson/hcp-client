import {
  GetDeliveryServiceImpl,
  GetDeliveryLoaderImpl,
  GetDeliveryTransformImpl,
} from './get-delivery.service';
import { getDeliveryMockData } from './get-delivery.mock';

const mockLoader = () => Promise.resolve(getDeliveryMockData);

export const GetDeliveryFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : GetDeliveryLoaderImpl;
  return GetDeliveryServiceImpl(loader, GetDeliveryTransformImpl);
};
