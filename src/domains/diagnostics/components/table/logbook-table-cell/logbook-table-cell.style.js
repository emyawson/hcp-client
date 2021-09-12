import styled from 'styled-components';
import { borderColor, flex } from 'styled-system';

import { TableCell } from 'src/domains/diagnostics/components/table-cell';
import { colors, spacing } from 'src/domains/diagnostics/styles';
import { getBorder } from 'src/domains/diagnostics/utils/border';

// NOTE this is a temporary solution to avoid breaking compatibility with the logbook header and logbook-diary header
// After header is re-designed these should be placed in the div style and the TableCell version should be deleted

const height = '2.2rem';
const color = colors.black;

const style = `
  ${borderColor};
  background-color: ${colors.clear};
  padding: 0;
`;

export const LogbookTableBaseCell = styled(TableCell).attrs({
  colSpan: props => props.colspan,
})`
  ${flex} ${style};
  width: ${props => props.width};
  min-width: ${props => props.width};
  max-width: ${props => props.width};
  border-left: ${props => getBorder(props.borderLeft)};
  border-right: ${props => getBorder(props.borderRight)};
  border-top: ${props => getBorder(props.borderTop)};
  border-bottom: ${props => getBorder(props.borderBottom)};
  padding-left: ${props => props.paddingLeft || 0};
  text-align: ${props => props.textAlign || 'center'};
  text-transform: ${props => props.textTransform};
  font-size: ${props => props.fontSize || '1rem'};
  font-weight: ${props => props.fontWeight};
  height: ${props => props.height || height};
  color: ${props => props.color || color};
  vertical-align: ${props => props.verticalAlign || 'baseline'};
`;

LogbookTableBaseCell.displayName = 'LogbookTableBaseCell';

export const LogbookTableBaseCellDiv = styled.div`
  ${style};
  width: ${props => props.width};
  min-width: ${props => props.width};
  max-width: ${props => props.width};
  border-left: ${props => getBorder(props.borderLeft)};
  border-right: ${props => getBorder(props.borderRight)};
  border-top: ${props => getBorder(props.borderTop)};
  border-bottom: ${props => getBorder(props.borderBottom)};
  height: 100%;
  color: color;
  cursor: ${props => (props.pointerCursor ? 'pointer' : 'inherit')};
  position: relative;
  &:after {
    position: absolute;
    top: ${spacing.two};
    left: 0;
    bottom: 0.375rem;
    width: 0.1875rem;
    border-radius: 0.1875rem;
    background: ${colors.blue};
    ${props => (props.highlight ? 'content: "";' : null)};
  }
`;

LogbookTableBaseCellDiv.displayName = 'LogbookTableBaseCellDiv';

export const LogbookTableAlternateCell = LogbookTableBaseCell.extend`
  background-color: ${colors.silver};
`;

LogbookTableAlternateCell.displayName = 'LogbookTableAlternateCell';

export const LogbookTableAlternateCellDiv = LogbookTableBaseCellDiv.extend`
  background-color: ${colors.silver};
`;

LogbookTableAlternateCellDiv.displayName = 'LogbookTableAlternateCellDiv';
