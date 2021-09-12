import styled from 'styled-components';
import { space, fontSize, color, width, textAlign } from 'styled-system';

import { colors } from 'src/core/styles';

export const TableRow = styled.tr`
  ${width};
  ${color};
  ${space};
  ${fontSize};
  ${textAlign};
`;

export const TableAltRow = styled(TableRow)`
  :nth-child(odd) {
    background: ${colors.white};
  }
`;

export const TableAltRowEven = styled(TableRow)`
  :nth-child(even) {
    background: ${colors.silverLight};
  }
`;
