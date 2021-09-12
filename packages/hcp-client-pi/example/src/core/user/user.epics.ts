import { combineEpics, Epic } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import { gigyaEventHandlers } from 'src/core/gigya/gigya.events';
import { AccountInfo } from 'src/core/gigya/gigya.types';
import { State } from 'src/store/example.types';

import { fetchAccountInfoSuccess } from './user.actions';
import { UserActions, UserActionType } from './user.types';

export const fetchUserEpic: Epic<UserActions, Partial<State>> = action$ =>
  action$
    .ofType(UserActionType.FETCH_ACCOUNT_INFO_START)
    .debounceTime(1000)
    .flatMap(
      (): Observable<AccountInfo> =>
        gigyaEventHandlers.accounts.getAccountInfo(),
    )
    .switchMap((account: AccountInfo) => {
      return Observable.of(fetchAccountInfoSuccess(account));
    });

export const userEpic = combineEpics(fetchUserEpic);
