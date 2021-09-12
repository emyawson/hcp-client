import {
  ThresholdServiceImpl,
  ThresholdLoaderImpl,
  ThresholdTransformImpl,
} from './threshold.service';
import { mockThresholds } from './threshold.mock';

const mockLoader = q => Promise.resolve(mockThresholds);

export const ThresholdFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : ThresholdLoaderImpl;
  return ThresholdServiceImpl(loader, ThresholdTransformImpl);
};
