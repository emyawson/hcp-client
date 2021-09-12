import styled from 'styled-components';

import {
  colors,
  transitions,
  transitionSpeed,
  transitionEasing,
} from 'src/core';
import { convertPxToRem } from 'src/utils';

const colorActive = colors.brandBlue;
const colorDisabled = colors.grayLight;

const ButtonReset = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
  display: block;
  margin: 0;
  outline: 0;
  padding: 0;
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
`;

export const ArrowWrapperButton = ButtonReset.extend`
  border-radius: 0;
  flex: 1;
  transition: ${transitions.default};

  path {
    fill: ${colors.white};
    transition: ${transitions.default};
  }

  &:focus {
    border-color: ${colorActive};

    path {
      fill: ${colorActive};
    }
  }

  &:hover {
    span {
      background-color: ${colors.brandBlueDark};
    }

    path {
      fill: ${colors.white};
    }
  }
`;

export const ArrowSpan = styled.span`
  align-items: center;
  background-color: ${props => (props.disabled ? colorDisabled : colorActive)};
  border-radius: 50%;
  display: inline-flex;
  height: ${props => convertPxToRem(props.size)};
  justify-content: center;
  transition: background ${transitionSpeed.default} ${transitionEasing.default};
  width: ${props => convertPxToRem(props.size)};
`;

// Adust icon positioning within circular button
// Vertically flip icon if direction set to "UP"
export const ArrowIconUpSpan = styled.span`
  display: inline-block;
  transform: scale(-1) translateY(-1px);
`;
