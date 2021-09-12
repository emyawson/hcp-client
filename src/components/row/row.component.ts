import styled from 'styled-components';
import {
  alignItems,
  alignSelf,
  borders,
  color,
  flex,
  flexWrap,
  fontSize,
  justifyContent,
  space,
  width,
} from 'styled-system';

export const Row: FixMe = styled.div`
  flex: 1;
  flex-direction: row;
  display: flex;
  ${space};
  ${color};
  ${width};
  ${flex};
  ${flexWrap};
  ${justifyContent};
  ${alignItems};
  ${alignSelf};
  ${borders};
  ${fontSize};
`;
