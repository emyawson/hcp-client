import {
  PrescriptionReasonsLoaderImpl,
  PrescriptionReasonsTransform,
  PrescriptionReasonsServiceImpl,
} from './prescription-reasons.service';
import { mockPrescriptionReasons } from './prescription-reasons.mock';

const mockLoader = q => Promise.resolve(mockPrescriptionReasons);

export const PrescriptionReasonsFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : PrescriptionReasonsLoaderImpl;
  return PrescriptionReasonsServiceImpl(loader, PrescriptionReasonsTransform);
};
