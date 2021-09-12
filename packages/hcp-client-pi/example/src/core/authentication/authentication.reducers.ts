import { Reducer } from 'redux';
import { ensureNever } from 'src/utils';

import {
  AuthenticationActionType,
  AuthenticationReducerActions,
  AuthenticationState,
} from './authentication.types';

export const INITIAL_AUTH_STATE: AuthenticationState = {
  token: '',
  isValid: false,
  isAuthenticated: false,
  hasLoggedOut: false,
};

export const sessionReducer: Reducer<AuthenticationState> = (
  state = INITIAL_AUTH_STATE,
  action: AuthenticationReducerActions,
) => {
  switch (action.type) {
    case AuthenticationActionType.VALIDATE_SESSION_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isValid: true,
        hasLoggedOut: false,
      };
    case AuthenticationActionType.VALIDATE_SESSION_ERROR:
      return {
        token: '',
        isValid: false,
      };
    case AuthenticationActionType.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case AuthenticationActionType.SIGN_OUT_ERROR:
    case AuthenticationActionType.SIGN_OUT_SUCCESS:
      return {
        token: '',
        isValid: false,
        hasLoggedOut: true,
      };
    default:
      ensureNever(action);
      return state;
  }
};
