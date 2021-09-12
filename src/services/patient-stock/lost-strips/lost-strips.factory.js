import {
  LostStripsServiceImpl,
  LostStripsLoaderImpl,
  LostStripsTransformImpl,
} from './lost-strips.service';
import { mockLostStripsPatientStock } from './lost-strips.mock';

const mockLoader = q => Promise.resolve(mockLostStripsPatientStock);

export const LostStripsFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : LostStripsLoaderImpl;
  return LostStripsServiceImpl(loader, LostStripsTransformImpl);
};
