import { Config } from 'src/core';
import { postJSON } from 'src/utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const AuthenticateLoaderImpl = (username, password) =>
  postJSON(`/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/authenticate`, {
    username,
    password,
  });

export const AuthenticateTransformImpl = body => ({
  token: body.token,
  firstTime: body.firstAccess,
  tempPassword: body.tempPassword,
  securityQuestions: body.securityQuestionOptions,
});

export const AuthenticateServiceImpl = (post, transform) => ({
  email,
  password,
}) => post(email, password).then(transform);
