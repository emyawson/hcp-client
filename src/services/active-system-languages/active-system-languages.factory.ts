import {
  GetActiveSystemLanguagesLoaderImpl,
  GetActiveSystemLanguagesServiceImpl,
  GetActiveSystemLanguagesTransformImpl,
} from './active-system-languages.service';

import { mockActiveLanguages } from './active-system-languages.mock';

const mockLoader = () => Promise.resolve(mockActiveLanguages);

export const GetActiveSystemLanguagesFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : GetActiveSystemLanguagesLoaderImpl;
  return GetActiveSystemLanguagesServiceImpl(
    loader,
    GetActiveSystemLanguagesTransformImpl,
  );
};
