import {
  SaveClinicGuideLoaderImpl,
  SaveClinicGuideServiceImpl,
  SaveClinicGuideTransformImpl,
} from './save-clinic-guide.service';
import { mockSavedClinicGuide } from './save-clinic-guide.mock';

const mockLoader = q => Promise.resolve(mockSavedClinicGuide);

export const SaveClinicGuideFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : SaveClinicGuideLoaderImpl;

  return SaveClinicGuideServiceImpl(loader, SaveClinicGuideTransformImpl);
};
