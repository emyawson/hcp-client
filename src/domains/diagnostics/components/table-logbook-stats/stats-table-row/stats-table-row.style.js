import styled from 'styled-components';
import { flex, borderColor } from 'styled-system';

import { getBorder } from 'src/domains/diagnostics/utils/border';
import { TableRow } from 'src/domains/diagnostics/components/table-row';

export const StatsGroupsTr = styled(TableRow)`
  ${flex};
  ${borderColor};
  width: ${props => props.width};
  min-width: ${props => props.width};
  max-width: ${props => props.width};
  color: colors.brandBlueDark;
  border-left: ${props => getBorder(props.borderLeft)};
  border-right: ${props => getBorder(props.borderRight)};
  border-top: ${props => getBorder(props.borderTop)};
  border-bottom: ${props => getBorder(props.borderBottom)};
  text-align: left;
`;
