import * as React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Dispatch } from 'redux';

import { PATTERNS_AND_INDICATORS_NAMESPACE } from '@roche/patterns-indicators/constants/namespace.constants';
import { State } from '@roche/patterns-indicators/core';

import {
  addCounter,
  removeCounter,
  startRandomCounter,
  stopRandomCounter,
} from '../store';

import { Counter } from './counter.component';
import { CounterProps } from './counter.types';

export const CounterContainer: React.ComponentClass<{}> = compose<CounterProps, {}>(
  connect(
    ({ [PATTERNS_AND_INDICATORS_NAMESPACE]: { counter } }: State) => ({
      counter: counter.counter,
      randomCounter: counter.randomCounter,
    }),
    (dispatch: Dispatch<State>) => ({
      addCounter: () => dispatch(addCounter()),
      removeCounter: () => dispatch(removeCounter()),
      startRandomCounter: () => dispatch(startRandomCounter()),
      stopRandomCounter: () => dispatch(stopRandomCounter()),
    }),
  ),
  lifecycle<CounterProps, void>({
    componentDidMount() {
      this.props.startRandomCounter();
    },
    componentWillUnmount() {
      // it is important to clean up and stop the random counter from firing before unmounting!
      this.props.stopRandomCounter();
    },
  }),
)(Counter);
