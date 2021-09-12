import {
  FrequenciesLoaderImpl,
  FrequenciesServiceImpl,
  FrequenciesTransformImpl,
} from './frequencies.service';
import { mockFrequenciesData } from './frequencies.mock';

const mockLoader = q => Promise.resolve(mockFrequenciesData);

export const FrequenciesFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : FrequenciesLoaderImpl;
  return FrequenciesServiceImpl(loader, FrequenciesTransformImpl);
};
