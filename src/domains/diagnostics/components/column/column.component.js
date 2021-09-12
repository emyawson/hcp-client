import styled from 'styled-components';
import {
  space,
  width,
  height,
  flex,
  flexWrap,
  justifyContent,
  alignItems,
  alignSelf,
  color,
} from 'styled-system';

export const Column = styled.div`
  flex: 1;
  flex-direction: column;
  display: flex;
  ${color};
  ${space};
  ${width};
  ${height};
  ${flex};
  ${flexWrap};
  ${justifyContent};
  ${alignItems};
  ${alignSelf};
`;
