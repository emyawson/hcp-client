import { ensureNever, set, setIn } from '@roche/patterns-indicators/utils';

import {
  CounterActionType,
  CounterReducerActions,
  CounterState,
} from './counter.types';

export const initialCounterState: CounterState = {
  counter: 0,
  randomCounter: 0,
};

export const counterReducer = (
  state = initialCounterState,
  action: CounterReducerActions,
): CounterState => {
  switch (action.type) {
    case CounterActionType.ADD_COUNTER:
      return set('counter', state.counter + 1, state);
    case CounterActionType.REMOVE_COUNTER:
      return setIn(['counter'], state.counter - 1, state);
    case CounterActionType.RANDOM_COUNTER:
      return set('randomCounter', state.randomCounter + action.payload, state);
    default:
      ensureNever(action);
      return state;
  }
};
