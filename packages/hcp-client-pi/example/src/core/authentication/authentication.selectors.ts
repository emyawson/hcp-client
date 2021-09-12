import { pathOr } from 'ramda';

export const getToken = pathOr('', ['session', 'token']);

export const getIsAuthenticated = pathOr(false, ['session', 'isAuthenticated']);

export const getIsValidSession = pathOr(false, ['session', 'isValid']);

export const selectHasLoggedOut = pathOr(false, ['session', 'hasLoggedOut']);
