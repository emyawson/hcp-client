import {
  getPatientInfoLoaderImpl,
  getPatientInfoServiceImpl,
  getPatientInfoTransformImpl,
} from './patient-info.service';

import { mockGetPatientInfoResponse } from './patient-info.mock';

const mockLoader = () => Promise.resolve(mockGetPatientInfoResponse);

export const getPatientInfoFactoryImpl = ({ devMode }) => {
  const load = devMode ? mockLoader : getPatientInfoLoaderImpl;
  const transform = getPatientInfoTransformImpl;
  return getPatientInfoServiceImpl(load, transform);
};
