import styled from 'styled-components';
import { borderColor } from 'styled-system';

import { TableCell } from 'src/domains/diagnostics/components/table-cell';
import { colors } from 'src/domains/diagnostics/styles';
import { getBorder } from 'src/domains/diagnostics/utils/border';

export const StatsTableCellBase = styled(TableCell)`
  height: 2.2rem;
  ${borderColor};
  width: ${props => props.width};
  min-width: ${props => props.width};
  max-width: ${props => props.width};
  background-color: colors.clear;
  color: colors.black;
  padding-left: ${props => props.paddingLeft};
  border-left: ${props => getBorder(props.borderLeft)};
  border-right: ${props => getBorder(props.borderRight)};
  border-top: ${props => getBorder(props.borderTop)};
  border-bottom: ${props => getBorder(props.borderBottom)};
  padding: 0;
  text-align: left;
  colspan: ${props => props.colSpan};
`;

export const StatsTableCellHighlighted = StatsTableCellBase.extend`
  background-color: ${colors.grayLight};
`;

export const StatsTableCellAlternate = StatsTableCellBase.extend`
  background-color: ${colors.silver};
`;
