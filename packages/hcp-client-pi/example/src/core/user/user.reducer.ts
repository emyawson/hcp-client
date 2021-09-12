import { Reducer } from 'redux';
import { ensureNever, setIn } from 'src/utils';

import { UserActionType, UserReducerActions, UserState } from './user.types';

export const initialUserState: UserState = {
  accountInfo: {
    data: {
      HCPIsAccessible: false,
      HCPIsActive: false,
    },
    profile: {
      firstName: '',
      lastName: '',
      birthDay: '',
      birthMonth: '',
      birthYear: '',
      email: '',
    },
  },
  error: '',
};

export const userReducer: Reducer<UserState> = (
  state = initialUserState,
  action: UserReducerActions,
) => {
  switch (action.type) {
    case UserActionType.FETCH_ACCOUNT_INFO_SUCCESS:
      return setIn(['accountInfo'], action.payload, state);
    case UserActionType.FETCH_ACCOUNT_INFO_ERROR:
      return setIn(['error'], action.payload, state);
    default:
      ensureNever(action);
      return state;
  }
};
