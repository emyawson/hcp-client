import { Reducer } from 'redux';

export type Mutable<T extends { [x: string]: any }, K extends string> = {
  [P in K]: T[P]
};
export type MutableState<S> = Mutable<S, keyof S>;
export type Reducers<S> = {
  [P in keyof MutableState<S>]?: Reducer<MutableState<S>[P]>
};
