import styled from 'styled-components';

import { ControlText } from 'src/components/forms';
import {
  boxShadow,
  colors,
  spacing,
  transitions,
  borderRadius,
} from 'src/core';
import { combineRems } from 'src/utils';

const colorActive = colors.brandBlue;

export const NumberInputFieldControl = styled(ControlText)`
  appearance: none;
  background-color: ${colors.white};
  border: 1px solid ${colors.grayLight};
  border-radius: ${borderRadius.three};
  color: ${props => (props.disabled ? colors.gray : colors.charcoal)};
  outline: 0;
  min-height: ${combineRems(spacing.three, spacing.four)};
  max-width: ${combineRems(spacing.four, spacing.four)};
  padding: ${spacing.one} ${spacing.two};
  text-align: center;
  transition: ${transitions.default};

  &:focus {
    border-color: ${colorActive};
    box-shadow: ${boxShadow({
      color: colorActive,
      depth: 'base',
    })};
    color: ${colorActive};
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &::-ms-clear {
    display: none;
  }
  -moz-appearance: textfield;
`;
