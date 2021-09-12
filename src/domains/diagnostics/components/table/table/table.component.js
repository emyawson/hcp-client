import styled from 'styled-components';
import { space, borderRadius } from 'styled-system';

import { colors } from 'src/domains/diagnostics/styles';

export const Table = styled.table`
  width: ${props => props.width || '100%'};
  border-collapse: collapse;
  background-color: ${props => (props.clearFill ? colors.clear : colors.white)};
  ${space};
  ${borderRadius};
`;

export const FixedTable = styled(Table)`
  table-layout: fixed;
`;

export const SeparateBordersTable = FixedTable.extend`
  border-collapse: separate;
  border-spacing: 0.75rem;
`;
