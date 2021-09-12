import {
  HelpLoaderImpl,
  HelpServiceImpl,
  HelpTransformImpl,
} from './help.service';

export const HelpFactoryImpl = () =>
  HelpServiceImpl(HelpLoaderImpl, HelpTransformImpl);
