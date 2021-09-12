import {
  VALIDATE_SESSION,
  REDIRECT_TO_LOGIN,
  SIGN_OUT,
} from './authentication.constants';

import { createRequestActions } from '../request';

export const validateSession = createRequestActions(VALIDATE_SESSION);
export const signOut = createRequestActions(SIGN_OUT);
export const onRedirectToLogin = () => ({ type: REDIRECT_TO_LOGIN });
