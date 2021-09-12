import {
  SetDeliveryStatusServiceImpl,
  SetDeliveryStatusLoaderImpl,
  SetDeliveryStatusTransformImpl,
} from './set-delivery-status.service';
import { mockSetDeliveryStatusData } from './set-delivery-status.mock';

const mockPost = urlbody => Promise.resolve(mockSetDeliveryStatusData);
export const SetDeliveryStatusFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockPost : SetDeliveryStatusLoaderImpl;
  return SetDeliveryStatusServiceImpl(loader, SetDeliveryStatusTransformImpl);
};
