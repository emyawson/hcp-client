import {
  StripModelsLoaderImpl,
  StripModelsTransform,
  StripModelsServiceImpl,
} from './strip-models.service';
import { mockStripModelData } from './strip-models.mock';

const mockLoader = q => Promise.resolve(mockStripModelData);

export const StripModelsFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : StripModelsLoaderImpl;
  return StripModelsServiceImpl(loader, StripModelsTransform);
};
