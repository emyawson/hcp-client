import React from 'react';

import { validateComponentProps } from './with-loader.util';

import { LoadingMessage } from '../loading-message/loading-message.component';

// -- With Loader HOC --
// Display a loading message while key component data loads
// Then, resolve to show the child component when loading has completed
// Useful for components such as graphs that require data from API to render
// Params: {
//   isLoading: A single component prop which is awaiting async data
//   LoaderComponent: Component which will display while loading
//   loaderProps: messaging and settings passed down to LoaderComponent
//   validators: an object with key-value pairs:
//   -- validation key (string), the prop name to evaluate
//   -- validator (function) - a function that takes in the prop value and returns a boolean (true/false if valid/invalid)
// }
// Note: isLoading prop will be evaluated if no validators are set

export const withLoader = ({
  isLoading,
  LoaderComponent = LoadingMessage,
  loaderProps,
  validators,
}) => Component => props => {
  const valid = validateComponentProps(validators, props, isLoading);
  if (valid && props.onLoad) {
    props.onLoad(valid);
  }
  if (props.hasError && props.onError) {
    props.onError();
  }
  return valid ? (
    <Component {...props} />
  ) : (
    <LoaderComponent {...loaderProps} />
  );
};
