import * as React from 'react';
import { Reducer, Store } from 'redux';
import { Epic } from 'redux-observable';

import { Action, PayloadAction } from '@roche/patterns-indicators/core/store';

export type Reducers<State> = { [P in keyof State]: Reducer<State[P]> };

type CombinedModuleState<Namespace, ChildState, ParentState> = {
  Namespace?: ChildState;
} & ParentState;

type ParentModuleFactory<
  Namespace,
  ChildState,
  Actions,
  Props,
  Config,
  Internationalization,
  Theme
> = <ParentState>(
  store: Store<CombinedModuleState<Namespace, ChildState, ParentState>>,
  injectReducer: (
    store: Store<CombinedModuleState<Namespace, ChildState, ParentState>>,
    namespace: Namespace,
    reducer: Reducers<ChildState> & { config: Reducer<Config> },
  ) => void,
  injectEpic: (epics) => void,
  config: Config,
  configReducer: (initialConfig: Config) => Reducer<Config>,
  theme: Theme,
  i18n: Internationalization,
) => Module<Props>;

export type ModuleActions = Action<string, any> | PayloadAction<string, any>;

export type ModuleValidator<Config, Internationalization, Theme> = (
  config: Config,
  theme: Internationalization,
  i18n: Theme,
) => boolean;

type ChildModuleFactory = <
  Namespace extends string,
  ChildState,
  Actions extends ModuleActions,
  Props,
  Config,
  Theme
>(
  namespace: Namespace,
  reducers: Reducers<Partial<ChildState>>,
  epics: Array<Epic<Actions, ChildState>>,
  validator: ModuleValidator<Config, any, Theme>,
  Component: React.ComponentClass<Props> | React.StatelessComponent<Props>,
) => ParentModuleFactory<
  Namespace,
  ChildState,
  Actions,
  Props,
  Config,
  any,
  Theme & {}
>;

type Module<Props> = (props: Props) => any;

export type ModuleFactory = ChildModuleFactory;
