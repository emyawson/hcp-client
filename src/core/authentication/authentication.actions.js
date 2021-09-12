import {
  VALIDATE_SESSION,
  FIRST_TIME,
  LOGIN,
  REDIRECT_TO_LOGIN,
  SIGN_OUT,
  RESET_PASSWORD,
} from './authentication.constants';

import { createRequestActions } from '../request';

export const login = createRequestActions(LOGIN);
export const firstTime = createRequestActions(FIRST_TIME);
export const resetPassword = createRequestActions(RESET_PASSWORD);
export const validateSession = createRequestActions(VALIDATE_SESSION);
export const signOut = createRequestActions(SIGN_OUT);

export const onAuthenticate = ({ email, password }) =>
  login.start({ email, password });

export const onFirstLogin = data => firstTime.start(data);
export const onResetPassword = data => resetPassword.start(data);

export const onSignOut = () => signOut.start();

export const onRedirectToLogin = () => ({ type: REDIRECT_TO_LOGIN });
