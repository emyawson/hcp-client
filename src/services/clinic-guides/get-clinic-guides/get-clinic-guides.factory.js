import {
  GetClinicGuidesLoaderImpl,
  GetClinicGuidesServiceImpl,
  GetClinicGuidesTransformImpl,
} from './get-clinic-guides.service';
import { mockClinicGuides } from './get-clinic-guides.mock';

const mockLoader = q => Promise.resolve(mockClinicGuides);

export const GetClinicGuidesFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : GetClinicGuidesLoaderImpl;

  return GetClinicGuidesServiceImpl(loader, GetClinicGuidesTransformImpl);
};
