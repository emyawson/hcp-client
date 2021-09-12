import {
  SaveAlertsServiceImpl,
  SaveAlertsLoaderImpl,
  SaveAlertsTransformImpl,
} from './save-alerts.service';
import { saveAlertsMockData } from './save-alerts.mock';

const mockPut = () => Promise.resolve(saveAlertsMockData);

export const SaveAlertsFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockPut : SaveAlertsLoaderImpl;
  return SaveAlertsServiceImpl(loader, SaveAlertsTransformImpl);
};
