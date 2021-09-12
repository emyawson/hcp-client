import {
  ProfileTypesLoaderImpl,
  ProfileTypesServiceImpl,
  ProfileTypesTransformImpl,
} from './profile-types.service';

import { mockResponse } from './profile-types.mock';

const mock = () => Promise.resolve(mockResponse);

export const ProfileTypesFactory = ({ devMode }) => {
  const loader = devMode ? mock : ProfileTypesLoaderImpl;
  return ProfileTypesServiceImpl(loader, ProfileTypesTransformImpl);
};
