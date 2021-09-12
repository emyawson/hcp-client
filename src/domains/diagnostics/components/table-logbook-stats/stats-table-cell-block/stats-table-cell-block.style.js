import styled from 'styled-components';
import { flex } from 'styled-system';

import { Block } from 'src/domains/diagnostics/components';
import { colors, spacing } from 'src/domains/diagnostics/styles';
import { getBorder } from 'src/domains/diagnostics/utils/border';

export const StatsCellBlockBase = styled(Block)`
  ${flex};
  background-color: ${colors.clear};
  border-left: ${props => getBorder(props.borderLeft)};
  border-right: ${props => getBorder(props.borderRight)};
  border-top: ${props => getBorder(props.borderTop)};
  border-bottom: ${props => getBorder(props.borderBottom)};
  padding: ${spacing.two} 0;
  overflow: hidden;
  text-align: left;
  line-height: 1.125rem;
`;
