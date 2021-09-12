import styled from 'styled-components';

import { TableCell } from 'src/domains/diagnostics/components';
import { colors } from 'src/domains/diagnostics/styles';
import { getBorder } from 'src/domains/diagnostics/utils/border';

export const BloodGlucoseOverviewTableCell = styled(TableCell)`
  color: ${props => (props.color ? props.color : colors.black)}
  border-left: ${props => getBorder(props.borderLeft)};
  border-right: ${props => getBorder(props.borderRight)};
  border-top: ${props => getBorder(props.borderTop)};
  border-bottom: ${props => getBorder(props.borderBottom)};
  height: ${props => (props.height ? props.height : 'inherit')};
  width: ${props => (props.width ? props.width : 'inherit')};
  vertical-align: ${props => (props.moveContentToTop ? 'top' : 'inherit')};
`;
