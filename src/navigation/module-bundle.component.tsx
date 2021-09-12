import * as React from 'react';

import { store } from 'src/app';
import { injectEpic } from 'src/epic';
import { injectReducer } from 'src/reducer';

import {
  BundleProps,
  BundleState,
} from 'src/navigation/module-bundle.component.types';

export class ModuleBundleComponent<
  T,
  ReducerKey = any /*extends keyof State*/
> extends React.Component<BundleProps<T, ReducerKey>, BundleState<T>> {
  private _isMounted: boolean = false;

  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  public componentDidMount() {
    this._isMounted = true;

    this.props
      .bundleWillLoad()
      .then(({ component, reducerEntry, rootEpic }) => {
        if (reducerEntry) {
          injectReducer(store, reducerEntry);
        }

        if (rootEpic) {
          injectEpic(rootEpic);
        }

        if (this._isMounted) {
          this.setState({ component });
        }
      });
  }

  public componentWillUnmount() {
    this._isMounted = false;
  }

  public render() {
    return this.state.component
      ? this.props.bundleDidLoad(this.state.component)
      : null;
  }
}
