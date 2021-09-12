import {
  PatientListServiceImpl,
  PatientListLoaderImpl,
  PatientListTransformImpl,
} from './patient-list.service';
import { mockPatientsListData } from './patient-list.mock';

const mockLoader = q => Promise.resolve(mockPatientsListData);

export const PatientListFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : PatientListLoaderImpl;
  return PatientListServiceImpl(loader, PatientListTransformImpl);
};
