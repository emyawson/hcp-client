import {
  CHANGE_LOCALE,
  CHANGE_LOCALE_ERROR,
  GET_CURRENT_USER,
} from './user.constants';

import { createRequestActions } from '../request';

export const getCurrentUser = createRequestActions(GET_CURRENT_USER);
export const onChangeLocale = locale => ({
  type: CHANGE_LOCALE,
  payload: locale,
});

export const onChangeLocaleError = () => ({
  type: CHANGE_LOCALE_ERROR,
  payload: false,
});
