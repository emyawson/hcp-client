import { Link as LinkComp } from 'react-router-dom';
import styled from 'styled-components';
import { width, fontSize, fontWeight, color, space } from 'styled-system';

import { colors } from 'src/domains/diagnostics/styles';

export const Link = styled(LinkComp)`
  ${width};
  ${space};
  ${color};
  ${fontSize};
  ${fontWeight};
  color: ${colors.black};
  text-decoration: none;
  :visited {
    color: ${colors.black};
  }
`;
