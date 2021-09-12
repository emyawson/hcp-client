import styled from 'styled-components';

import {
  borderRadius,
  boxShadow,
  boxShadows,
  colors,
  spacing,
  transitions,
} from 'src/core';
import { P, weight } from 'src/components';
import { ControlCheckbox } from 'src/components/forms';
import { convertPxToRem } from 'src/utils';

const paddingRatio = 1 / 12;
const bgColorsByState = {
  active: colors.brandBlue,
  disabled: colors.silver,
  focused: colors.blueMarine,
};

export const ToggleSwitchWrapperLabel = styled.label``;

export const ToggleSwitchP = P.extend`
  color: ${colors.charcoal};
  font-weight: ${weight.semiBold};
  margin: 0 0 ${spacing.three};
`;

export const ToggleSwitchContainerSpan = styled.span`
  background-color: ${bgColorsByState.disabled};
  border-color: ${colors.clear};
  border-radius: ${borderRadius.twenty};
  border-style: solid;
  border-width: ${props => convertPxToRem(props.size * paddingRatio)};
  box-sizing: content-box;
  cursor: pointer;
  display: block;
  transition: ${transitions.default};
  width: ${props => convertPxToRem(props.size * 2)};
`;

export const ToggleSwitchIndicatorSpan = styled.span`
  background-color: ${colors.white};
  border-radius: ${borderRadius.circle};
  box-shadow: ${boxShadows.base};
  display: block;
  height: ${props => convertPxToRem(props.size)};
  transition: ${transitions.exit};
  transform: translate(0, 0);
  will-change: transform;
  width: ${props => convertPxToRem(props.size)};
`;

export const ToggleSwitchInput = styled.input`
  position: absolute;
  opacity: 0;

  &:checked + ${ToggleSwitchContainerSpan} {
    background-color: ${bgColorsByState.active};

    & ${ToggleSwitchIndicatorSpan} {
      transform: translateX(100%);
      transition: ${transitions.enter};
    }
  }

  &:focus + ${ToggleSwitchContainerSpan} {
    background-color: ${bgColorsByState.focused};
    box-shadow: ${boxShadow({
      color: bgColorsByState.focused,
      depth: 'base',
    })};
    & ${ToggleSwitchIndicatorSpan} {
      box-shadow: ${boxShadows.one};
    }
  }
`;

export const ToggleSwitchControl = ToggleSwitchInput.withComponent(
  ControlCheckbox,
);
