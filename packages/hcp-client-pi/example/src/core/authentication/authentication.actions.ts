import { createAction, createPayloadAction } from 'src/utils/store/actions.utils';

import {
  AuthenticationActionType,
  LoginSuccessAction,
  SessionValidationErrorPayload,
  SignoutErrorAction,
  SignoutSuccessAction,
  ValidateSessionErrorAction,
  ValidateSessionStartAction,
  ValidateSessionSuccessAction,
} from './authentication.types';

export const loginSuccess = (): LoginSuccessAction =>
  createAction(AuthenticationActionType.LOGIN_SUCCESS);

export const validateSessionStart = (): ValidateSessionStartAction =>
  createAction(AuthenticationActionType.VALIDATE_SESSION_START);

export const validateSessionError = (
  payload: SessionValidationErrorPayload,
): ValidateSessionErrorAction =>
  createPayloadAction(AuthenticationActionType.VALIDATE_SESSION_ERROR, payload);

export const validateSessionSuccess = (payload: {
  token: string;
}): ValidateSessionSuccessAction =>
  createPayloadAction(
    AuthenticationActionType.VALIDATE_SESSION_SUCCESS,
    payload,
  );

export const signoutSuccess = (): SignoutSuccessAction =>
  createAction(AuthenticationActionType.SIGN_OUT_SUCCESS);

export const signoutError = (): SignoutErrorAction =>
  createAction(AuthenticationActionType.SIGN_OUT_ERROR);
