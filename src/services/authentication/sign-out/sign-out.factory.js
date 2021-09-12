import { SignOutLoaderImpl, SignOutServiceImpl } from './sign-out.service';

export const SignOutFactoryImpl = () =>
  SignOutServiceImpl(SignOutLoaderImpl, data => data);
