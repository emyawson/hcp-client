import { createRequestActionTypes } from '../request';

export const LOGIN_BASE = 'LOGIN';
export const LOGIN = createRequestActionTypes(LOGIN_BASE);

export const FIRST_TIME_BASE = 'FIRST_TIME';
export const FIRST_TIME = createRequestActionTypes(FIRST_TIME_BASE);

export const VALIDATE_SESSION_BASE = 'VALIDATE_SESSION';
export const VALIDATE_SESSION = createRequestActionTypes(VALIDATE_SESSION_BASE);

export const RESET_PASSWORD_BASE = 'RESET_PASSWORD';
export const RESET_PASSWORD = createRequestActionTypes(RESET_PASSWORD_BASE);

export const SIGN_OUT_BASE = 'SIGN_OUT';
export const SIGN_OUT = createRequestActionTypes(SIGN_OUT_BASE);
export const REDIRECT_TO_LOGIN = 'REDIRECT_TO_LOGIN';
