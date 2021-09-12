import * as React from 'react';
import styled from 'styled-components';
import {
  alignItems,
  alignSelf,
  borderColor,
  borders,
  bottom,
  color,
  display,
  flex,
  flexDirection,
  flexWrap,
  height,
  justifyContent,
  justifySelf,
  left,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  position,
  right,
  space,
  top,
  width,
} from 'styled-system';

import { SharedInputStyles } from '../input.style';

import { InputTextProps } from './input-text.types';

export const styleInputText = (
  InputComponent: React.StatelessComponent<InputTextProps>,
) => styled(InputComponent)`
  ${SharedInputStyles};

  border-color: ${({ hasError, theme }: InputTextProps) =>
    hasError ? theme.colors.trafficRed : ''};
  color: ${({ hasError, theme }: InputTextProps) =>
    hasError ? theme.colors.trafficRed : ''};
  padding: ${({ theme }) => theme.spacing.three}
    ${({ theme }) => theme.spacing.three};
  width: ${'100%'};
  ${color};
  ${space};
  ${width};
  ${height};
  ${flex};
  ${flexWrap};
  ${justifyContent};
  ${justifySelf};
  ${alignItems};
  ${alignSelf};
  ${borders};
  ${borderColor};
  ${display};
  ${flexDirection};
  ${maxWidth};
  ${minWidth};
  ${minHeight};
  ${maxHeight};
  ${position};
  ${top};
  ${left};
  ${right};
  ${bottom};
`;
