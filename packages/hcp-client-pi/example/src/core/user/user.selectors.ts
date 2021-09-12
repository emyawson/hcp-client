import { all, prop } from 'ramda';
import { createSelector } from 'reselect';

import {
  AccountInfoData,
  AccountInfoProfile,
} from 'src/core/gigya/gigya.types';
import { UserState } from 'src/core/user/user.types';
import { State } from 'src/store/example.types';
import { getIn, hasValue, propOr } from 'src/utils/ramda';

const defaultData: AccountInfoData = {
  HCPIsActive: false,
  HCPIsAccessible: false,
};

const defaultProfile: AccountInfoProfile = {
  firstName: '',
  lastName: '',
  birthDay: '',
  birthMonth: '',
  birthYear: '',
  email: '',
};

const defaultAccountInfo = {
  profile: defaultProfile,
  data: defaultData,
};

export const selectUser = (state: State) => getIn(['user'], state);

export const selectAccountInfo = createSelector([selectUser], (user: UserState) =>
  propOr(defaultAccountInfo, 'accountInfo', user),
);

export const selectData = createSelector([selectAccountInfo], (accountInfo: UserState['accountInfo']) =>
  propOr(defaultData, 'data', accountInfo),
);

export const selectProfile = createSelector(selectAccountInfo, profile =>
  propOr(defaultProfile, 'profile', profile),
);

export const selectHCPIsActive = createSelector([selectData], data =>
  propOr(false, 'HCPIsAccessible', data),
);

export const selectHCPIsAccessible = createSelector([selectData], data =>
  propOr(false, 'HCPIsActive', data),
);

export const selectEmail = createSelector([selectProfile], profile =>
  prop('email', profile),
);

export const selectFirstName = createSelector([selectProfile], profile =>
  prop('firstName', profile),
);

export const selectLastName = createSelector([selectProfile], profile =>
  prop('lastName', profile),
);

export const selectFullName = createSelector(
  [selectFirstName, selectLastName],
  (firstName, lastName) =>
    all(hasValue)([firstName, lastName]) ? `${firstName} ${lastName}` : '',
);

export const selectBirthDay = createSelector([selectProfile], profile =>
  prop('birthDay', profile),
);

export const selectBirthMonth = createSelector([selectProfile], profile =>
  prop('birthMonth', profile),
);

export const selectBirthYear = createSelector([selectProfile], profile =>
  prop('birthYear', profile),
);
