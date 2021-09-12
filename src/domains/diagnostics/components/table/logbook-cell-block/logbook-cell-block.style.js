import styled from 'styled-components';
import { flex, textAlign, color } from 'styled-system';

import { Block } from 'src/domains/diagnostics/components/block';
import { colors, spacing } from 'src/domains/diagnostics/styles';
import { getBorder } from 'src/domains/diagnostics/utils/border';

export const LogbookCellBlockBase = styled(Block)`
  ${flex};
  background-color: ${colors.clear};
  ${color};
  border-left: ${props => getBorder(props.borderLeft)};
  border-right: ${props => getBorder(props.borderRight)};
  border-top: ${props => getBorder(props.borderTop)};
  border-bottom: ${props => getBorder(props.borderBottom)};
  overflow: hidden;
  text-align: center;
  ${textAlign};
  font-size: 0.75rem;
  line-height: 1.125rem;
  height: ${props => props.height || '2.5rem'};
  padding: ${props => props.p || `${spacing.one} 0`};
`;

LogbookCellBlockBase.displayName = 'LogbookCellBlockBase';

export const LogbookCellBlockAlternate = LogbookCellBlockBase.extend`
  background-color: ${colors.silverLight};
`;

LogbookCellBlockAlternate.displayName = 'LogbookCellBlockAlternate';
