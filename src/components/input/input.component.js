import * as React from 'react';

import { InputTextField } from './input.style';

export const Input: FixMe = ({ id, model, type, ...props }) => (
  <InputTextField id={`Input--${id}`} model={model} type={type} {...props} />
);

export const InputText: FixMe = props => <Input type="text" {...props} />;

export const InputEmail: FixMe = props => <Input type="email" {...props} />;

export const InputPassword: FixMe = props => (
  <Input type="password" {...props} />
);
