import { AccountInfo } from 'src/core/gigya/gigya.types';
import { Diff } from 'src/utils';
import { Action, PayloadAction } from 'src/utils/store/store.types';

export enum AuthenticationActionType {
  VALIDATE_SESSION_START = 'VALIDATE_SESSION_START',
  VALIDATE_SESSION_ERROR = 'VALIDATE_SESSION_ERROR',
  VALIDATE_SESSION_SUCCESS = 'VALIDATE_SESSION_SUCCESS',
  SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS',
  SIGN_OUT_ERROR = 'SIGN_OUT_ERROR',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
}

export type AuthenticationState = {
  readonly token: string;
  readonly isValid: boolean;
  readonly hasLoggedOut: boolean;
  readonly isAuthenticated: boolean;
};

export type SessionValidationErrorPayload = {
  id_token: string;
  account: AccountInfo;
  error: boolean;
  message: string;
};

export type ValidateSessionStartAction = Action<
  AuthenticationActionType.VALIDATE_SESSION_START
>;
export type ValidateSessionSuccessAction = PayloadAction<
  AuthenticationActionType.VALIDATE_SESSION_SUCCESS,
  any
>;
export type ValidateSessionErrorAction = PayloadAction<
  AuthenticationActionType.VALIDATE_SESSION_ERROR,
  any
>;
export type SignoutSuccessAction = Action<
  AuthenticationActionType.SIGN_OUT_SUCCESS
>;
export type SignoutErrorAction = Action<
  AuthenticationActionType.SIGN_OUT_ERROR
>;
export type LoginSuccessAction = Action<AuthenticationActionType.LOGIN_SUCCESS>;

export type AuthenticationEpicOnlyActions = ValidateSessionStartAction;

export type AuthenticationActions =
  | AuthenticationEpicOnlyActions
  | ValidateSessionSuccessAction
  | ValidateSessionErrorAction
  | SignoutSuccessAction
  | SignoutErrorAction
  | LoginSuccessAction;

export type AuthenticationReducerActions = Diff<
  AuthenticationActions,
  AuthenticationEpicOnlyActions
>;
