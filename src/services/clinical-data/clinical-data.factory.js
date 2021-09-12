import {
  ClinicalDataServiceImpl,
  ClinicalDataLoaderImpl,
  ClinicalDataTransformImpl,
} from './clinical-data.service';
import { mockClinicalData } from './clinical-data.mock';

const mockLoader = (q: any) => Promise.resolve(mockClinicalData);

export const ClinicalDataFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : ClinicalDataLoaderImpl;
  return ClinicalDataServiceImpl(loader, ClinicalDataTransformImpl);
};
