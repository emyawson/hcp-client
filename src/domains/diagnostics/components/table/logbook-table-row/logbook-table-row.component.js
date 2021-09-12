import styled from 'styled-components';
import { flex } from 'styled-system';

import { TableRow } from 'src/domains/diagnostics/components/table-row';
import { colors } from 'src/domains/diagnostics/styles';

export const LogbookTableRow = styled(TableRow)`
  ${flex};
  background-color: ${props =>
    props.isSelected ? colors.lightTurqoise : 'none'};
  opacity: ${props => (props.isSelected ? '0.8' : '1.0')};
  border-top: ${props =>
    props.borderTop ? `0.0625rem solid ${colors.grayLight}` : 'none'};
  border-bottom: ${props =>
    props.borderBottom ? `0.0625rem solid ${colors.grayLight}` : 'none'};
`;
