import { ReactNode } from 'react';
import { Epic } from 'redux-observable';
import { State } from 'src/store/example.types';
import { ReducerEntry } from 'src/utils/store/store.types';

export type BundleData<Component, ReducerKey extends keyof State> = {
  readonly component: Component;
  readonly reducerEntry?: ReducerEntry<ReducerKey>;
  readonly rootEpic?: Epic<any, any>;
};

export type BundleProps<Component, ReducerKey extends keyof State> = {
  readonly bundleWillLoad: () => Promise<BundleData<Component, ReducerKey>>;
  readonly bundleDidLoad: (comp: Component) => ReactNode;
};

export type BundleState<Component> = { readonly component?: Component };
