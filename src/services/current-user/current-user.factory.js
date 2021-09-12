import {
  CurrentUserLoaderImpl,
  CurrentUserServiceImpl,
  CurrentUserTransformImpl,
} from './current-user.service';

export const CurrentUserFactoryImpl = () =>
  CurrentUserServiceImpl(CurrentUserLoaderImpl, CurrentUserTransformImpl);
