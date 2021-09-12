import { combineEpics, Epic } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/mergeMap';

import { authenticationEpic } from 'src/core/authentication/authentication.epics';
import { userEpic } from 'src/core/user/user.epics';
import { Action } from 'src/utils/store/store.types';

import { State } from './example.types';

// We still don't have any app level epics so I created a stub one
// as a placeholder, but we can replace this eventually with an
// actual app level epic
export const rootEpic: Epic<Action<string>, State> = combineEpics(
  userEpic,
  authenticationEpic,
);

export const epic$ = new BehaviorSubject(rootEpic);

export const appEpic: Epic<Action<string>, State> = (action$, store) =>
  epic$.mergeMap(epic => epic(action$, store, null));

export const injectEpic = (asyncEpic: Epic<Action<string, any>, State>) =>
  epic$.next(asyncEpic);
