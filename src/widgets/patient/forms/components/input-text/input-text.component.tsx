import * as React from 'react';

import { styleInputText } from './input-text.style';
import { InputTextProps } from './input-text.types';

export const Input: React.StatelessComponent<InputTextProps> = ({
  id,
  model,
  type,
  minWidth, // TODO: Properly clean styled-system props
  ...inputProps
}) => <input id={id} model={model} type={type} {...inputProps} />;

export const InputTextComponent: React.StatelessComponent<InputTextProps> = ({
  hasError,
  ...props
}) => <Input type="text" {...props} />;

export const InputText = styleInputText(InputTextComponent);
