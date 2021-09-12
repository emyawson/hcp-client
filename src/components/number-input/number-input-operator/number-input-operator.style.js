import styled from 'styled-components';
import { path } from 'ramda';

import { boxShadow, colors, spacing, fontSize, transitions } from 'src/core';
import { combineRems } from 'src/utils';

const colorActive = colors.brandBlue;
const colorDisabled = colors.grayMedium;

const buttonSizeSmall = combineRems(spacing.two, spacing.three);
const buttonSizeLarge = combineRems(spacing.three, spacing.four);

const buttonStylesByPosition = {
  default: {
    borderColor: colors.clear,
    borderWidth: '0',
    minWidth: buttonSizeSmall,
  },
  left: {
    borderColor: colors.grayLight,
    borderWidth: '0 1px 0 0',
    minWidth: buttonSizeLarge,
  },
  right: {
    borderColor: colors.grayLight,
    borderWidth: '0 0 0 1px',
    minWidth: buttonSizeLarge,
  },
};

export const NumberInputControlButton = styled.button`
  appearance: none;
  background-color: transparent;
  border-style: solid;
  border-width: ${props =>
    path([props.position, 'borderWidth'])(buttonStylesByPosition)};
  border-color: ${props =>
    path([props.position, 'borderColor'])(buttonStylesByPosition)};
  border-radius: 0;
  box-shadow: none;
  color: ${props => (props.disabled ? colorDisabled : colorActive)};
  cursor: pointer;
  font-size: ${fontSize.p};
  min-height: ${combineRems(spacing.two, spacing.three)};
  min-width: ${props =>
    path([props.position, 'minWidth'])(buttonStylesByPosition)};
  outline: none;
  padding: 0 ${spacing.two};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  transition: ${transitions.default};

  path {
    fill: ${props => (props.disabled ? colorDisabled : colorActive)};
    transition: ${transitions.default};
  }

  &:focus {
    box-shadow: ${boxShadow({
      color: colorActive,
      depth: 'base',
    })};
    color: ${colorActive};

    path {
      fill: ${colorActive};
    }
  }

  &:hover {
    background-color: ${colorActive};
    color: ${colors.white};

    path {
      fill: ${colors.white};
    }
  }
`;
NumberInputControlButton.defaultProps = {
  position: 'default',
};
