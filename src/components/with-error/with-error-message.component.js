import React from 'react';
import { branch, compose, renderComponent } from 'recompose';

import { REQUEST_ANIMATION_DELAY } from 'src/core';
import { withTimeout } from 'src/utils';

import { withLoader } from '../with-loader/with-loader.component';

// Evaluate the "hasError" prop of a given Component
// If this component has an error state, display an alternate ErrorComponent
// Used with the "withTimeout" utility to show errors on request failure
export const withErrorMessage = ({ ErrorComponent }) => Component =>
  branch(
    props => props.hasError,
    renderComponent(ErrorComponent),
    renderComponent(Component),
  )(Component);

// Apply a new set of props on to a component if loading fails
export const withErrorState = errorState => Component => props => (
  <Component {...props} {...errorState} />
);

// Combine the withErrorMessage and withTimeout utilities
// Display a default Component while the timer runs
// If the timer expires, pass new props to the child
// App will then render the ErrorComponent using "withErrorMessage" switch
export const withErrorMessageOnTimeout = ({
  duration = REQUEST_ANIMATION_DELAY * 8,
  ErrorComponent,
}) => Component =>
  withTimeout({
    TimeoutComponent: withErrorMessage({ ErrorComponent })(Component),
    duration,
    stopTimer: 'hasError',
  })(Component);

// Combine the withLoader, withErrorMessage and withTimeout utilities
// Display a loading indicator while awaiting async data
// If the request does not complete within the timeout, display error messaging
export const withLoaderErrorOnTimeout = ({
  errorOptions,
  loaderOptions,
}) => Component =>
  compose(
    withErrorMessageOnTimeout(errorOptions),
    withLoader(loaderOptions),
  )(Component);
