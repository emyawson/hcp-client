import { Config } from 'src/core';
import { postJSON } from 'src/utils';
import { createAuthHeader } from 'src/utils/auth-token';

import { ResetPasswordService } from './reset-password.service';

const mockLoader = () =>
  Promise.resolve({
    token: '123456',
  });

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const ResetPasswordLoaderImpl = (
  { username, oldPassword, newPassword },
  token,
) =>
  postJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/updateTempPassword`,
    {
      username,
      oldPassword,
      newPassword,
    },
    {
      Authorization: createAuthHeader(token),
    },
  );

export const ResetPasswordTransformImpl = body => body;

export const ResetPasswordFactory = ({ devMode }) => {
  const loader = devMode ? mockLoader : ResetPasswordLoaderImpl;
  return ResetPasswordService(loader, ResetPasswordTransformImpl);
};
