import {
  DeleteClinicGuideLoaderImpl,
  DeleteClinicGuideServiceImpl,
  DeleteClinicGuideTransformImpl,
} from './delete-clinic-guide.service';
import { mockDeleteClinicGuideResponse } from './delete-clinic-guide.mock';

const mockLoader = q => Promise.resolve(mockDeleteClinicGuideResponse);

export const DeleteClinicGuideFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : DeleteClinicGuideLoaderImpl;

  return DeleteClinicGuideServiceImpl(loader, DeleteClinicGuideTransformImpl);
};
