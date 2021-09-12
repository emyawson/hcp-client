import {
  GetPatientStockServiceImpl,
  GetPatientStockLoaderImpl,
  GetPatientStockTransformImpl,
} from './get-patient-stock.service';
import { mockPatientStockData } from './get-patient-stock.mock';

const mockLoader: PatientStockLoader = q =>
  Promise.resolve(mockPatientStockData);

export const PatientStockFactoryImpl = ({ devMode }) => {
  const loader: PatientStockLoader = devMode
    ? mockLoader
    : GetPatientStockLoaderImpl;
  return GetPatientStockServiceImpl(loader, GetPatientStockTransformImpl);
};
