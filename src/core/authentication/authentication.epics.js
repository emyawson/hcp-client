import { Observable } from 'rxjs';
import { push, getLocation } from 'react-router-redux';

import { getCombinedRoutes } from 'src/navigation/navigation.selectors';

import { validateSession, signOut } from './authentication.actions';
import {
  SIGN_OUT,
  VALIDATE_SESSION,
  REDIRECT_TO_LOGIN,
  TOKEN_REFRESH_PERIOD_SECONDS,
} from './authentication.constants';

import { fetchPermissions } from '../permissions/permissions.actions';
import { clearPatientState } from '../patient/patient.action';
import {
  clearOrganizationState,
  clearPermissions,
} from '../state/state.actions';
import { gigyaEventHandlers } from '../gigya/gigya.events';
import { isSessionValid } from '../gigya/gigya.utils';

const REDIRECT_ERROR = { type: 'REDIRECT_ERROR', payload: true };

export const validateSessionEpic = () => action$ =>
  action$
    .ofType(VALIDATE_SESSION.START)
    .debounceTime(1000)
    .flatMap(() =>
      Observable.zip(
        gigyaEventHandlers.accounts.getJWT(),
        gigyaEventHandlers.accounts.getAccountInfo(),
      ),
    )
    .map(
      ([{ id_token }, account]) =>
        !isSessionValid(account)
          ? validateSession.error({
              error: true,
              message: 'Something went wrong with your gigya validation',
              account,
              id_token,
            })
          : validateSession.success({
              gigyaUser: account,
              token: id_token,
              timeout: Date.now() + TOKEN_REFRESH_PERIOD_SECONDS,
            }),
    )
    .flatMap(action => [action, fetchPermissions.start()]);

export const refreshGigyaSessionValidationEpic = () => action$ =>
  action$
    .ofType(VALIDATE_SESSION.SUCCESS)
    .delay(1000 * TOKEN_REFRESH_PERIOD_SECONDS)
    .mapTo(validateSession.start());

export const redirectToLoginEpic = () => (action$, store$) =>
  action$.ofType(REDIRECT_TO_LOGIN).map(() => {
    const routes = getCombinedRoutes(store$.getState());
    const location = getLocation(store$.getState());
    return location.pathname === routes.authentication.login ||
      location.pathname === '/?next='
      ? REDIRECT_ERROR
      : push(routes.authentication.login);
  });

export const signOutEpic = () => action$ =>
  action$
    .ofType(SIGN_OUT.START, VALIDATE_SESSION.ERROR)
    .flatMap(() => gigyaEventHandlers.accounts.getAccountInfo())
    .flatMap(account => {
      try {
        gigyaEventHandlers.accounts.logout({ UID: account.UID });
        return [signOut.success()];
      } catch (e) {
        return [signOut.error()];
      }
    });

export const redirectAfterSignOutEpic = () => action$ =>
  action$
    .ofType(SIGN_OUT.SUCCESS, SIGN_OUT.ERROR, VALIDATE_SESSION.ERROR)
    .flatMap(() => [
      clearPatientState(),
      clearPermissions(),
      clearOrganizationState(),
    ]);
