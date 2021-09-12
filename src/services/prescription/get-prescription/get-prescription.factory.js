import {
  GetPrescriptionServiceImpl,
  GetPrescriptionLoaderImpl,
  GetPrescriptionTransformImpl,
} from './get-prescription.service';
import { mockCurrentPrescriptionsData } from './get-prescription.mock';

const mockGetter = q => Promise.resolve(mockCurrentPrescriptionsData);

export const GetPrescriptionFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockGetter : GetPrescriptionLoaderImpl;
  return GetPrescriptionServiceImpl(loader, GetPrescriptionTransformImpl);
};
