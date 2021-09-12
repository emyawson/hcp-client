import * as React from 'react';
import styled from 'styled-components';
import {
  alignItems,
  alignSelf,
  backgroundImage,
  borderColor,
  borders,
  bottom,
  boxShadow,
  color,
  display,
  flex,
  flexDirection,
  flexWrap,
  fontSize,
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
  textAlign,
  top,
  width,
} from 'styled-system';

import { StyledSystemProps } from 'src/theme/theme.types';

import { BaseStyleProps } from '../component.types';

type DivProps = BaseStyleProps & {
  readonly id?: string;
};

export const DivComponent: React.StatelessComponent<
  DivProps & StyledSystemProps
> = ({ className, children = null, onClick }) => (
  <div className={className} onClick={onClick}>
    {children}
  </div>
);

export const Div = styled(DivComponent)`
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
  ${backgroundImage};
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
  ${fontSize};
  ${textAlign};
  ${boxShadow};
`;
