import styled from 'styled-components';
import { space, width, borderColor, boxShadow } from 'styled-system';

import { borderRadius } from 'src/core';
import { ControlText } from 'src/components/forms';

export const InputTextField = styled(ControlText)`
  appearance: none;
  display: flex;
  border: 1px solid ${props => props.theme.colors.grayLight};
  border-radius: ${borderRadius.six};
  outline: none;
  width: 100%;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  -moz-appearance: textfield;
  padding: ${props => props.theme.spacing.three}
    ${props => props.theme.spacing.four};
  ${borderColor};
  ${boxShadow};
  ${width};
  ${space};
`;
InputTextField.displayName = 'InputTextField';

export const InputTextArea = InputTextField.withComponent('textarea').extend`
  color: ${props => props.theme.colors.grayDark};
  font-size: ${props => props.theme.fontSize.p};
  min-height: 5rem;
  padding: ${props => props.theme.spacing.three};
`;
InputTextArea.displayName = 'InputTextArea';
