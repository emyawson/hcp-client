import styled from 'styled-components';

import { getBorder } from 'src/domains/diagnostics/utils/border';

export const LogbookCellBlocksContainer = styled.div`
  display: flex;
  justify-content: start;
  margin: ${props => props.m || '0'};
  border-left: ${props => getBorder(props.borderLeft)};
  border-right: ${props => getBorder(props.borderRight)};
  border-bottom: ${props => getBorder(props.borderBottom)};
`;

LogbookCellBlocksContainer.displayName = 'LogbookCellBlocksContainer';
