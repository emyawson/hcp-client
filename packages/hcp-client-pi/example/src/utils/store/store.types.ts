import { Reducer } from 'redux';
import { State } from 'src/store/example.types';
import { Mutable } from 'src/utils/typescript';

type MutableState = Mutable<State, keyof State>;

export type Reducers = { [P in keyof MutableState]?: Reducer<MutableState[P]> };

export type Action<Type, Meta = void> = {
  readonly type: Type;
  readonly meta?: Meta;
};

export type PayloadAction<Type, Payload, Meta = void> = Action<Type, Meta> & {
  readonly payload: Payload;
};

export type ReducerEntry<ReducerKey extends keyof State> = {
  readonly key: ReducerKey;
  readonly reducer: Reducer<State[ReducerKey]>;
};
