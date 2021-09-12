import { Config } from 'src/core';
import { postJSON, createAuthHeader } from 'src/utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;
export const FirstTimeLoaderImpl = (
  { chosenQuestion, answer, oldPassword, newPassword },
  token,
) =>
  postJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/setPasswordAndSecurityQuestion`,
    {
      chosenQuestion,
      answer,
      oldPassword,
      newPassword,
    },
    {
      Authorization: createAuthHeader(token),
    },
  );

export const FirstTimeTransformImpl = body => body;

export const FirstTimeService = (post, transform) => (params, token) =>
  post(params, token).then(transform);
