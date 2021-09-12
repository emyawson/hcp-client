import { VALIDATE_SESSION, SIGN_OUT, LOGIN } from './authentication.constants';

import { GET_CURRENT_USER } from '../user/user.constants';

export const userReducer = (state, action) => {
  switch (action.type) {
    case VALIDATE_SESSION.SUCCESS:
      return { ...action.payload };
    default:
      return state;
  }
};

export const INITIAL_SESSION_FORM_STATE = {
  token: '',
  isValid: false,
  hasLoggedOut: false,
};

export const sessionReducer = (state = INITIAL_SESSION_FORM_STATE, action) => {
  switch (action.type) {
    case GET_CURRENT_USER.SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case LOGIN.SUCCESS:
      return {
        ...state,
        isValid: true,
      };
    case VALIDATE_SESSION.SUCCESS:
      return {
        ...state,
        ...action.payload,
        isValid: true,
        hasLoggedOut: false,
      };
    case VALIDATE_SESSION.ERROR:
      return {
        token: '',
        isValid: false,
      };
    case SIGN_OUT.ERROR:
    case SIGN_OUT.SUCCESS:
      return {
        token: '',
        isValid: false,
        hasLoggedOut: true,
      };
    default:
      return state;
  }
};
