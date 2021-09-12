import {
  GetLatestPatientsLoaderImpl,
  GetLatestPatientsServiceFactoryImpl,
  GetLatestPatientsTransformImpl,
} from './get-latest-patients.service';

import { mockGetLatestPatients } from './get-latest-patients.mock';

const mockLoader = () => Promise.resolve(mockGetLatestPatients);

export const GetLatestPatientsFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : GetLatestPatientsLoaderImpl;
  return GetLatestPatientsServiceFactoryImpl(
    loader,
    GetLatestPatientsTransformImpl,
  );
};
