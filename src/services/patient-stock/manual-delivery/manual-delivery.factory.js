import {
  ManualDeliveryServiceImpl,
  ManualDeliveryLoaderImpl,
  ManualDeliveryTransformImpl,
} from './manual-delivery.service';
import { mockManualDeliveryPatientStock } from './manual-delivery.mock';

const mockLoader: ManualDeliveryLoader = q =>
  Promise.resolve(mockManualDeliveryPatientStock);

export const ManualDeliveryFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : ManualDeliveryLoaderImpl;
  return ManualDeliveryServiceImpl(loader, ManualDeliveryTransformImpl);
};
