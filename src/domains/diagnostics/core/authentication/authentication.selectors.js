import { path } from 'ramda';

export const getToken = path(['session', 'token']);

export const getIsValidSession = path(['session', 'isValid']);

export const selectHasTemporaryPassword = path([
  'authentication',
  'resetPassword',
  'hasTemporaryPassword',
]);

export const selectHasLoggedOut = path(['session', 'hasLoggedOut']);
