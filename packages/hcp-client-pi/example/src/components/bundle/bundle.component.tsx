import * as React from 'react';
import { injectEpic } from 'src/store/example.epics';
import { injectReducer } from 'src/store/example.reducer';
import { store } from 'src/store/example.store';
import { State } from 'src/store/example.types';

import { BundleProps, BundleState } from './bundle.component.types';

export class Bundle<T, ReducerKey extends keyof State> extends React.Component<
  BundleProps<T, ReducerKey>,
  BundleState<T>
> {
  constructor(props: BundleProps<T, ReducerKey>) {
    super(props);
    this.state = {};
  }

  public async componentWillMount() {
    const {
      component,
      reducerEntry,
      rootEpic,
    } = await this.props.bundleWillLoad();

    if (reducerEntry) {
      injectReducer(store, reducerEntry);
    }

    if (rootEpic) {
      injectEpic(rootEpic);
    }

    this.setState({ component });
  }

  public render() {
    return this.state.component
      ? this.props.bundleDidLoad(this.state.component)
      : null;
  }
}
