import { Action, PayloadAction } from '@roche/patterns-indicators/core';
import { Diff } from '@roche/patterns-indicators/utils';

export enum CounterActionType {
  ADD_COUNTER = 'ADD_COUNTER',
  REMOVE_COUNTER = 'REMOVE_COUNTER',
  START_RANDOM_COUNTER = 'START_RANDOM_COUNTER',
  STOP_RANDOM_COUNTER = 'STOP_RANDOM_COUNTER',
  RANDOM_COUNTER = 'RANDOM_COUNTER',
}

export type CounterState = {
  readonly counter: number;
  readonly randomCounter: number;
};

export type AddCounterAction = Action<CounterActionType.ADD_COUNTER>;

export type RemoveCounterAction = Action<CounterActionType.REMOVE_COUNTER>;

export type StartRandomCounterAction = Action<
  CounterActionType.START_RANDOM_COUNTER
>;

export type StopRandomCounterAction = Action<
  CounterActionType.STOP_RANDOM_COUNTER
>;

export type RandomCounterAction = PayloadAction<
  CounterActionType.RANDOM_COUNTER,
  number
>;

export type CounterEpicActions =
  | StartRandomCounterAction
  | StopRandomCounterAction;

export type CounterActions =
  | AddCounterAction
  | RemoveCounterAction
  | StartRandomCounterAction
  | StopRandomCounterAction
  | RandomCounterAction;

export type CounterReducerActions = Diff<CounterActions, CounterEpicActions>;
