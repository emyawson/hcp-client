import { AccountInfo } from 'src/core/gigya/gigya.types';
import { Diff } from 'src/utils';
import { Action, PayloadAction } from 'src/utils/store/store.types';

export enum UserActionType {
  FETCH_ACCOUNT_INFO_START = 'FETCH_ACCOUNT_INFO_START',
  FETCH_ACCOUNT_INFO_SUCCESS = 'FETCH_ACCOUNT_INFO_SUCCESS',
  FETCH_ACCOUNT_INFO_ERROR = 'FETCH_ACCOUNT_INFO_ERROR',
}

// GIGYA Account Info call
export type AccountInfoPayload = AccountInfo;

export type FetchAccountInfoStart = Action<
  UserActionType.FETCH_ACCOUNT_INFO_START
>;
export type FetchAccountInfoSuccess = PayloadAction<
  UserActionType.FETCH_ACCOUNT_INFO_SUCCESS,
  AccountInfoPayload
>;
// TODO: Error state payload
export type FetchAccountInfoError = PayloadAction<
  UserActionType.FETCH_ACCOUNT_INFO_ERROR,
  any
>;

// State and action combinations
export type UserState = {
  accountInfo: AccountInfo;
  error: any;
};

export type UserEpicActions = FetchAccountInfoStart;

export type UserActions =
  | FetchAccountInfoStart
  | FetchAccountInfoSuccess
  | FetchAccountInfoError;

export type UserReducerActions = Diff<UserActions, UserEpicActions>;
