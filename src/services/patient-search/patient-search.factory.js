import {
  PatientSearchServiceImpl,
  PatientSearchLoaderImpl,
  PatientSearchTransformImpl,
} from './patient-search.service';

const mockLoader = q => Promise.resolve([{ id: 1, firstName: 1 }]);

export const PatientSearchFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : PatientSearchLoaderImpl;
  return PatientSearchServiceImpl(loader, PatientSearchTransformImpl);
};
