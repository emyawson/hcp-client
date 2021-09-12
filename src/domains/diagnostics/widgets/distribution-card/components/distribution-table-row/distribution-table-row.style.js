import styled from 'styled-components';
import { textAlign, fontSize } from 'styled-system';

import { colors, spacing } from 'src/domains/diagnostics/styles';
import { TableRow, TableCell } from 'src/domains/diagnostics/components';

export const DistributionTableCell = styled(TableCell)`
  ${textAlign};
  ${fontSize};
  padding: ${spacing.two};
`;

export const DistributionTableRowWrapper = styled(TableRow)`
  :nth-child(odd) {
    background: ${colors.blueMarineAlpha5};
  }
`;

export const StatBadge = styled.div`
  width: ${spacing.two};
  height: ${spacing.two};
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: ${spacing.two};
`;

export const IconTableCell = styled.div`
  display: flex;
  align-items: center;
`;
