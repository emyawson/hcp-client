import { ReactNode } from 'react';
import { Reducer } from 'redux';
import { Epic } from 'redux-observable';

export type ReducerEntry<
  ReducerState,
  ReducerKey = any /*extends keyof State*/
> = {
  readonly key: ReducerKey;
  readonly reducer: Reducer<ReducerState>;
};
export type BundleData<Component, ReducerKey = any /*extends keyof State*/> = {
  readonly component: Component;
  readonly reducerEntry?: ReducerEntry</*State[ReducerKey]*/ any, ReducerKey>;
  readonly rootEpic?: Epic<any, any>;
};

export type BundleProps<Component, ReducerKey = any /*extends keyof State*/> = {
  readonly bundleWillLoad: () => Promise<BundleData<Component, ReducerKey>>;
  readonly bundleDidLoad: (comp: Component) => ReactNode;
};

export type BundleState<Component> = {
  readonly component?: Component;
  readonly isMounted?: boolean;
};
