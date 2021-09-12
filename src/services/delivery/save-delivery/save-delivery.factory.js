import {
  SaveDeliveryServiceImpl,
  SaveDeliveryLoaderImpl,
  SaveDeliveryTransformImpl,
} from './save-delivery.service';
import { mockSaveDeliveryResponse } from './save-delivery.mock';

const mockPost = (url, body) => Promise.resolve(mockSaveDeliveryResponse);
export const SaveDeliveryFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockPost : SaveDeliveryLoaderImpl;
  return SaveDeliveryServiceImpl(loader, SaveDeliveryTransformImpl);
};
