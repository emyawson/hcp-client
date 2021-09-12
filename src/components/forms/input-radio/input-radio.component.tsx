import * as React from 'react';

import {
  RadioButtonIndicatorSpan,
  RadioButtonLabelSpan,
  RadioButtonLabelWrapper,
} from './input-radio.style';
import { InputRadioProps } from './input-radio.types';

export const InputRadio: React.StatelessComponent<InputRadioProps> = ({
  id,
  label,
  ...inputProps
}) => (
  <RadioButtonLabelWrapper htmlFor={id}>
    <input type="radio" id={id} {...inputProps} />
    <RadioButtonIndicatorSpan />
    {label && <RadioButtonLabelSpan>{label}</RadioButtonLabelSpan>}
  </RadioButtonLabelWrapper>
);
