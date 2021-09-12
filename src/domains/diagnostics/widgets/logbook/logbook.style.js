import styled from 'styled-components';

import { colors, spacing } from 'src/domains/diagnostics/styles';

export const LogbookWrapper = styled.div`
  background-color: ${props => props.blueBackground && colors.blueMarineAlpha5};
  min-height: inherit;
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-basis: auto;
  justify-content: center;
`;

LogbookWrapper.displayName = 'LogbookWrapper';

export const LogbookGraphWrapperDiv = styled.div`
  margin: ${({ collapsed }) =>
    collapsed ? '0' : `${spacing.two} ${spacing.four} 1.8rem`};
  overflow-x: auto;
  flex: 1 1 0;
  ${props => props.collapsed && 'flex-basis: auto'};
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;

LogbookGraphWrapperDiv.displayName = 'LogbookGraphWrapperDiv';

export const GraphDetailContainer = styled.div`
  position: relative;
  justify-content: flex-end;
`;

GraphDetailContainer.displayName = 'GraphDetailContainer';

export const LogbookGraphWrapper = styled.div`
  height: ${props =>
    props.tableHeight ? `${props.tableHeight}px` : 'initial'};
`;
LogbookGraphWrapper.displayName = 'LogbookGraphWrapper';
