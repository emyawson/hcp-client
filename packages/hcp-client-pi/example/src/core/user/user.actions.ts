import { createAction, createPayloadAction } from 'src/utils/store/actions.utils';

import {
  AccountInfoPayload,
  FetchAccountInfoError,
  FetchAccountInfoStart,
  FetchAccountInfoSuccess,
  UserActionType,
} from './user.types';

export const fetchAccountInfoStart = (): FetchAccountInfoStart =>
  createAction(UserActionType.FETCH_ACCOUNT_INFO_START);

export const fetchAccountInfoSuccess = (
  payload: AccountInfoPayload,
): FetchAccountInfoSuccess =>
  createPayloadAction(UserActionType.FETCH_ACCOUNT_INFO_SUCCESS, payload);

export const fetchAccountInfoError = (error: any): FetchAccountInfoError =>
  createPayloadAction(UserActionType.FETCH_ACCOUNT_INFO_ERROR, error);
