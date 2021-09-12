import {
  AuthenticateLoaderImpl,
  AuthenticateTransformImpl,
  AuthenticateServiceImpl,
} from './authenticate.service';

const mockLoader = () =>
  Promise.resolve({
    token: '123456',
  });

export const AuthenticateFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : AuthenticateLoaderImpl;
  return AuthenticateServiceImpl(loader, AuthenticateTransformImpl);
};
