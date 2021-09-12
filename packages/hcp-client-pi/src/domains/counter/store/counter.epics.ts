import { combineEpics, Epic } from 'redux-observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import { interval } from 'rxjs/observable/interval';

import { randomCounter } from './counter.actions';
import {
  CounterActions,
  CounterActionType,
  CounterState,
} from './counter.types';

export const randomCounterEpic: Epic<CounterActions, CounterState> = action$ =>
  action$
    .ofType(CounterActionType.START_RANDOM_COUNTER)
    .switchMap(() =>
      interval(1000).map(
        () => (Math.random() > 0.5 ? randomCounter(1) : randomCounter(-1)),
      ),
    )
    .takeUntil(action$.ofType(CounterActionType.STOP_RANDOM_COUNTER));

export const counterEpic = combineEpics<CounterActions, CounterState>(
  randomCounterEpic,
);
