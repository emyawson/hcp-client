import { combineEpics, Epic } from 'redux-observable';
import { Observable } from 'rxjs';

import { AccountInfo, JWTInfo } from 'src/core/gigya/gigya.types';
import { fetchAccountInfoSuccess } from 'src/core/user/user.actions';
import { UserActions } from 'src/core/user/user.types';
import { State } from 'src/store/example.types';

import { gigyaEventHandlers } from '../gigya/gigya.events';
import { isSessionValid } from '../gigya/gigya.utils';

import {
  AuthenticationActions,
  AuthenticationActionType,
} from './authentication.types';

import {
  validateSessionError,
  validateSessionSuccess,
} from './authentication.actions';

export const validateSessionEpic: Epic<
  AuthenticationActions | UserActions,
  State | Partial<State>
> = action$ =>
  action$
    .ofType(AuthenticationActionType.VALIDATE_SESSION_START)
    .debounceTime(1000)
    .flatMap(() =>
      Observable.zip(
        gigyaEventHandlers.accounts.getJWT(),
        gigyaEventHandlers.accounts.getAccountInfo(),
      ),
    )
    .flatMap<[JWTInfo, AccountInfo], AuthenticationActions | UserActions>(
      ([{ id_token }, account]) =>
        isSessionValid(account)
          ? [
              validateSessionError({
                account,
                error: true,
                message: 'Something went wrong with your gigya validation',
                id_token,
              }),
            ]
          : [
              fetchAccountInfoSuccess(account),
              validateSessionSuccess({
                token: id_token,
              }),
            ],
    );

export const authenticationEpic = combineEpics(validateSessionEpic);
