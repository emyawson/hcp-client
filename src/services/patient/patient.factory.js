import {
  PatientServiceImpl,
  PatientLoaderImpl,
  PatientTransformImpl,
} from './patient.service';
import { mockPatientData } from './patient.mock';

const mockLoader = q => Promise.resolve(mockPatientData);

export const PatientFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : PatientLoaderImpl;
  return PatientServiceImpl(loader, PatientTransformImpl);
};
