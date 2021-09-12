import { DTCLoaderImpl, DTCServiceImpl, DTCTransformImpl } from './dtc.service';

export const DTCFactoryImpl = () =>
  DTCServiceImpl(DTCLoaderImpl, DTCTransformImpl);
