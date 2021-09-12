import {
  SavePrescriptionServiceImpl,
  SavePrescriptionLoaderImpl,
  SavePrescriptionTransformImpl,
} from './save-prescription.service';

import { transformPrescriptionToJSON } from '../prescription.util';

const mockPoster = ({ prescription }) =>
  Promise.resolve(transformPrescriptionToJSON(prescription));

export const SavePrescriptionFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockPoster : SavePrescriptionLoaderImpl;
  return SavePrescriptionServiceImpl(loader, SavePrescriptionTransformImpl);
};
