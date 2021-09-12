import {
  all,
  path,
  prop,
  propOr,
  pipe,
  toUpper,
  ifElse,
  isNil,
  identity,
} from 'ramda';
import { createSelector } from 'reselect';

import { hasValue } from 'src/utils';

export const selectSessionState = path(['session']);

export const selectEC6UserState = createSelector(
  [selectSessionState],
  sessionState => propOr({}, 'user', sessionState),
);

export const selectEC6DepartmentId = createSelector(
  [selectEC6UserState],
  user => prop('departmentId', user),
);

export const selectEC6UserId = createSelector([selectEC6UserState], user =>
  prop('id', user),
);

export const selectEC6UserLanguage = createSelector(
  [selectEC6UserState],
  userState => propOr('en', 'languageIsoCode', userState),
);

export const selectGigyaUserState = createSelector(
  [selectSessionState],
  sessionState => propOr({}, 'gigyaUser', sessionState),
);

export const selectGigyaProfile = createSelector([selectGigyaUserState], user =>
  propOr({}, 'profile', user),
);

export const selectGigyaData = createSelector([selectGigyaUserState], user =>
  propOr({}, 'data', user),
);

export const selectUID = createSelector([selectGigyaUserState], user =>
  prop(null, 'UID', user),
);

export const selectHCPIsActive = createSelector([selectGigyaData], data =>
  propOr(false, 'HCPIsActive', data),
);

export const selectHomeCountry = createSelector([selectGigyaData], data =>
  pipe(
    propOr(null, 'billAddressCountryCode'),
    ifElse(isNil, identity, toUpper),
  )(data),
);

export const selectEmail = createSelector([selectGigyaProfile], profile =>
  prop('email', profile),
);

export const selectFirstName = createSelector([selectGigyaProfile], profile =>
  prop('firstName', profile),
);

export const selectLastName = createSelector([selectGigyaProfile], profile =>
  prop('lastName', profile),
);

export const selectFullName = createSelector(
  [selectFirstName, selectLastName],
  (firstName, lastName) =>
    all(hasValue)([firstName, lastName]) ? `${firstName} ${lastName}` : '',
);

export const selectAge = createSelector([selectGigyaProfile], profile =>
  prop('age', profile),
);

export const selectBirthDay = createSelector([selectGigyaProfile], profile =>
  prop('birthDay', profile),
);

export const selectBirthMonth = createSelector([selectGigyaProfile], profile =>
  prop('birthMonth', profile),
);

export const selectBirthYear = createSelector([selectGigyaProfile], profile =>
  prop('birthYear', profile),
);
