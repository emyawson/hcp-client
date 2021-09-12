import styled from 'styled-components';

import {
  borderRadius,
  boxShadow,
  fontSize,
  colors,
  spacing,
  transitions,
} from 'src/core';
import { convertPxToRem, combineRems } from 'src/utils';

const colorActive = colors.brandBlue;
const colorDisabled = colors.grayLight;

export const CircleButton = styled.span`
  align-items: center;
  background-color: ${colorActive};
  border-radius: 50%;
  border: ${convertPxToRem(2)} solid ${colorActive};
  color: ${colorActive};
  display: inline-flex;
  justify-content: center;
  line-height: 1;
  outline: none;
  height: ${props => convertPxToRem(24)};
  width: ${props => convertPxToRem(24)};
  margin: 0 ${spacing.three} 0 0;
  cursor: pointer;
`;

export const CircleButtonSymbol = styled.span``;

export const AddPrescriptionButton = styled.button`
  align-items: center;
  background-color: ${colors.white};
  border: ${convertPxToRem(2)} solid
    ${props => (props.disabled ? colorDisabled : colorActive)};
  border-radius: ${borderRadius.three};
  cursor: pointer;
  display: flex;
  justify-content: center;
  font-size: ${fontSize.p};
  padding: ${combineRems(spacing.two, spacing.three)} ${spacing.three};
  transition: ${transitions.default};
  width: 100%;

  &:hover,
  &:focus {
    box-shadow: ${boxShadow({ depth: 'one' })};
    border-color: ${colorActive};
    color: ${colorActive};
    outline: none;
  }

  &[disabled] {
    color: ${colorDisabled};
    cursor: not-allowed;
    pointer-events: none;

    ${CircleButton} {
      background-color: ${colorDisabled};
      border-color: ${colorDisabled};
      color: ${colorDisabled};
    }
  }
`;
