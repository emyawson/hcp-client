import {
  GetPatientSummaryServiceImpl,
  GetPatientSummaryLoaderImpl,
  GetPatientSummaryTransformImpl,
} from './get-patient-summary.service';
import { mockPatientSummaryData } from './get-patient-summary.mock';

const mockLoader: PatientSummaryLoader = q =>
  Promise.resolve(mockPatientSummaryData);

export const GetPatientSummaryFactoryImpl: GetPatientSummaryFactory = ({
  devMode,
}) => {
  const loader = devMode ? mockLoader : GetPatientSummaryLoaderImpl;
  return GetPatientSummaryServiceImpl(loader, GetPatientSummaryTransformImpl);
};
