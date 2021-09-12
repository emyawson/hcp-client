import styled from 'styled-components';

import { ControlCheckbox } from 'src/components/forms';
import { borderRadius, boxShadow, colors, transitions } from 'src/core';
import { blendHexColor, convertPxToRem } from 'src/utils';

const checkboxActiveColor = colors.brandBlue;
const checkboxDisabledColor = colors.grayLight;

export const CheckboxContainer = styled.label`
  display: flex;
  position: relative;
  padding-left: ${props => convertPxToRem(props.leftPadding)};
  padding-right: ${props => convertPxToRem(props.rightPadding)};
  cursor: pointer;
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
`;

export const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;

  &:checked + span {
    background-color: ${checkboxActiveColor};
    border-color: ${checkboxActiveColor};
    &:hover {
      background-color: ${blendHexColor(checkboxActiveColor, 5)};
    }
  }

  &:checked + span > span {
    color: ${colors.white};
    visibility: visible;
  }

  &:hover + span,
  &:focus + span {
    border-color: ${checkboxActiveColor};
    box-shadow: ${boxShadow({
      color: checkboxActiveColor,
      depth: 'base',
    })};
  }
`;

export const CheckboxControl = CheckboxInput.withComponent(ControlCheckbox);

export const CheckboxCheckMarkContainer = styled.span`
  align-items: center;
  background-color: ${colors.white};
  border: 1px solid
    ${props => (props.disabled ? checkboxDisabledColor : colors.gray)};
  border-radius: ${borderRadius.three};
  display: flex;
  height: ${props => convertPxToRem(props.size)};
  justify-content: center;
  left: ${props => (props.labelBeforeCheckbox ? 'inherit' : 0)};
  position: absolute;
  right: ${props => (!props.labelBeforeCheckbox ? 'inherit' : 0)};
  text-align: center;
  top: 0;
  transition: ${transitions.default};
  width: ${props => convertPxToRem(props.size)};
`;

export const CheckboxCheckMark = styled.span`
  visibility: hidden;
`;
