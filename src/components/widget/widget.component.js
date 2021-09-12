import styled from 'styled-components';
import {
  width,
  space,
  flexWrap,
  flex,
  flexDirection,
  justifyContent,
  alignSelf,
  alignItems,
} from 'styled-system';

import { boxShadows, colors, spacing, borderRadius } from 'src/core';

export const Widget = styled.section`
  ${flex} ${flexDirection} ${flexWrap} ${justifyContent} ${alignSelf} ${alignItems} ${space} ${width} display: flex;
  flex: 1;
  min-height: calc(100vh - 7.625rem);
  background: ${colors.white};
  padding: ${spacing.four};
  border: 1px solid ${colors.silverMedium};
  border-radius: ${borderRadius.six};
  box-shadow: ${boxShadows.two};
  align-items: center;
  justify-content: center;
`;
