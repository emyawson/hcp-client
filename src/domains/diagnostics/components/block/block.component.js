import styled from 'styled-components';
import {
  flex,
  space,
  color,
  borders,
  borderColor,
  display,
  alignItems,
  justifyContent,
  flexDirection,
  maxWidth,
  minWidth,
} from 'styled-system';

export const Block = styled.div`
  ${flex};
  ${space};
  ${color};
  ${borders};
  ${borderColor};
  ${display};
  ${alignItems};
  ${justifyContent};
  ${flexDirection};
  ${maxWidth};
  ${minWidth};
`;

export const CursorBlock = Block.extend`
  cursor: pointer;
`;
