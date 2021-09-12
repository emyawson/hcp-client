import { createAction, createPayloadAction } from '@roche/patterns-indicators/core';

import {
  AddCounterAction,
  CounterActionType,
  RandomCounterAction,
  RemoveCounterAction,
  StartRandomCounterAction,
  StopRandomCounterAction,
} from './counter.types';

export const addCounter = (): AddCounterAction =>
  createAction(CounterActionType.ADD_COUNTER);

export const removeCounter = (): RemoveCounterAction =>
  createAction(CounterActionType.REMOVE_COUNTER);

export const startRandomCounter = (): StartRandomCounterAction =>
  createAction(CounterActionType.START_RANDOM_COUNTER);

export const stopRandomCounter = (): StopRandomCounterAction =>
  createAction(CounterActionType.STOP_RANDOM_COUNTER);

export const randomCounter = (payload: number): RandomCounterAction =>
  createPayloadAction(CounterActionType.RANDOM_COUNTER, payload);
