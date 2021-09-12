import React from 'react';
import { isEmpty, pathOr, pipe } from 'ramda';

import {
  maskUserNumberInput,
  castValueToDisplayString,
  sanitizeNumericInput,
} from 'src/utils';

import { NumberInputFieldControl } from './number-input-field.style';

// Prevent Chrome & IE validation popups
export const disableBrowserValidation = e => {
  e.preventDefault();
};

// Check if input contains a valid value after user input
// If not, reset the state to within range
export const shouldReplaceValue = (value, min) =>
  isEmpty(value) || (value && parseInt(value, 10) < min);

export const shouldReduceValue = (value, max) =>
  value && parseInt(value, 10) > max;

export const onBlurHandler = (max, min, updateField) => e => {
  const value = pipe(
    pathOr('', ['target', 'value']),
    sanitizeNumericInput,
  )(e);
  shouldReplaceValue(value, min)
    ? updateField(min)
    : shouldReduceValue(value, max)
      ? updateField(max)
      : updateField(parseInt(value, 10));
};

export const NumberInputField = ({
  id,
  model,
  min,
  max,
  disabled = false,
  updateField,
  ...props
}) => (
  <NumberInputFieldControl
    model={model}
    type="number"
    id={`NumberInput--${id}`}
    min={min}
    max={max}
    step="1"
    parser={value => maskUserNumberInput(value, max)}
    updateOn="change"
    onBlur={onBlurHandler(max, min, updateField)}
    onChange={e => updateField(e.target.value)}
    onInvalid={disableBrowserValidation}
    mapProps={{ value: castValueToDisplayString }}
    disabled={disabled}
    {...props}
  />
);
