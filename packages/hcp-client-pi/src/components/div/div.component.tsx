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

import { StyledSystemProps } from '@roche/patterns-indicators/utils/styles/styled-system.types';

type DivProps = {
  children?: any;
  className?: string;
};

export const DivComponent: React.StatelessComponent<
  DivProps & StyledSystemProps
> = ({ className, children = null }) => (
  <div className={className}>{children}</div>
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
