import {
  GetAlertsServiceImpl,
  GetAlertsLoaderImpl,
  GetAlertsTransformImpl,
} from './get-alerts.service';
import { mockAlertsData } from './get-alerts.mock';

const mockLoader = q => Promise.resolve(mockAlertsData);

export const GetAlertsFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : GetAlertsLoaderImpl;
  return GetAlertsServiceImpl(loader, GetAlertsTransformImpl);
};
