import {
  CreatePatientLoaderImpl,
  CreatePatientServiceImpl,
  CreatePatientTransformImpl,
} from './create-patient.service';

import { mockCreatePatientResponse } from './create-patient.mock';

const mockPoster = () => Promise.resolve(mockCreatePatientResponse);

export const CreatePatientFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockPoster : CreatePatientLoaderImpl;
  return CreatePatientServiceImpl(loader, CreatePatientTransformImpl);
};
