import {
  TherapiesLoaderImpl,
  TherapiesTransformImpl,
  TherapiesServiceImpl,
} from './therapies.service';
import { mockTherapies } from './therapies.mock';

const mockLoader = () => Promise.resolve(mockTherapies);

export const TherapiesFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : TherapiesLoaderImpl;
  return TherapiesServiceImpl(loader, TherapiesTransformImpl);
};
