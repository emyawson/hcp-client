import { isEmpty } from 'ramda';
import { actions } from 'react-redux-form';
import { compose, withHandlers, withState } from 'recompose';

// Normalize React Redux Form event values to strings
// To be used in conjunction with RRF getValue event
// By default, the getValue function returns the value by checking if the event is a DOM event.
// * If so, it returns event.target.value
// * If not, it returns the event
// https://davidkpiano.github.io/react-redux-form/docs/api/Control.html#prop-getValue
export const getInputValue = event =>
  event.target ? event.target.value.toString() : event.toString();

// Shorten user text input to a maximum of {maxLength} characters
export const maskInputMaxLength = (event, maxLength) => {
  const value = getInputValue(event);
  return value ? value.substring(0, maxLength) : '';
};

// Calculate maximum string length based on maximum integer
export const maxInputLength = max => max.toString().length;
// Limit user text input to same length as numeric input
// Parse integer to remove leading zero on numbers
// Default to empty str
export const maskUserNumberInput = (value, max) =>
  !isEmpty(value)
    ? parseInt(maskInputMaxLength(value, maxInputLength(max)), 10)
    : '';
// Convert number value (mapped to state) to str for display in input box
// Uses props from React Redux Form helper
// React Redux form requires str output

export const addLocalFormDispatchHandlers = compose(
  // handlers to attach the RRF Local Form dispatcher
  withState('formDispatch', 'attachDis', null),
  withHandlers({
    attachDispatch: ({ attachDis }) => dispatch => attachDis(() => dispatch),
    updateValue: ({ formDispatch }) => (model, value) =>
      formDispatch(actions.change(model, value)),
  }),
);

export const castValueToDisplayString = ({ modelValue }) =>
  modelValue.toString();

const nonNumericCharacters = /[^0-9\\.-]+/g;
export const sanitizeNumericInput = value =>
  value.replace(nonNumericCharacters, '');
