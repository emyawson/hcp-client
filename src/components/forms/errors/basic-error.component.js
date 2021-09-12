import React from 'react';

import { Errors } from './errors.component';

export const showFieldError = field => field.touched && !field.focus;

export const BasicError = ({
  model,
  messages = { isRequired: 'required' },
  color = 'trafficRed',
  fontSize = '0.7rem',
  show = showFieldError,
  ...props
}) => (
  <Errors
    model={model}
    show={show}
    messages={messages}
    fontSize={fontSize}
    color={color}
    {...props}
  />
);
