import styled from 'styled-components';

import { borderRadius, colors, transitions } from 'src/core';
import { applyRatioToRem, convertPxToRem, hexToRGBA } from 'src/utils';

const colorDisabled = colors.grayLight;
const sizeDefault = convertPxToRem(42);

const borderRatio = {
  default: 1 / 9,
  large: 1 / 15,
};

const getBorderRatioBySize = size =>
  size > 60 ? borderRatio.large : borderRatio.default;

const calculateBorderSize = size =>
  applyRatioToRem(convertPxToRem(size), getBorderRatioBySize(size));

export const constructWrapperBackground = color => hexToRGBA(color, 0.3);

export const BadgeWrapperSpan = styled.span`
  background-color: ${props =>
    props.emptyInnerCircle
      ? 'transparent'
      : props.disabled
        ? constructWrapperBackground(colorDisabled)
        : constructWrapperBackground(props.bgColor)};
  border-radius: ${borderRadius.circle};
  border-style: ${props => (props.emptyInnerCircle ? 'solid' : 'inherit')};
  border-width: ${props =>
    props.emptyInnerCircle ? calculateBorderSize(props.size) : 'inherit'};
  border-color: ${props =>
    props.emptyInnerCircle
      ? constructWrapperBackground(props.bgColor)
      : 'inherit'};
  display: inline-block;
  padding: ${props =>
    props.emptyInnerCircle
      ? 0
      : props.size
        ? calculateBorderSize(props.size)
        : calculateBorderSize(sizeDefault)};
  transition: ${transitions.default};
`;

export const BadgeIconSpan = styled.span`
  align-items: center;
  background-color: ${props =>
    props.emptyInnerCircle
      ? 'transparent'
      : props.bgColor && !props.disabled
        ? props.bgColor
        : colorDisabled};
  border-radius: ${borderRadius.circle};
  color: ${props => props.theme.colors.white};
  display: flex;
  height: ${props => (props.size ? convertPxToRem(props.size) : sizeDefault)};
  justify-content: center;
  transition: ${transitions.slow};
  width: ${props => (props.size ? convertPxToRem(props.size) : sizeDefault)};
  will-change: transform;
  color: ${props => props.theme.colors.brandBlue};

  path {
    fill: ${props => props.theme.colors.white};
  }
`;
