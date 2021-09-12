import { Config } from 'src/core';
import { createAuthHeader, deleteJSON } from 'src/utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const SignOutLoaderImpl = token =>
  deleteJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/authenticate`,
    {},
    {
      Authorization: createAuthHeader(token),
    },
  );

export const SignOutServiceImpl = loader => (data, token) => loader(token);
