import styled from 'styled-components';

import { spacing } from 'src/domains/diagnostics/styles';
import { COLLAPSED_STD_GRAPH_HEIGHT_IN_REM } from 'src/domains/diagnostics/scenes/graphs/graph.constants';

export const BasalRateSection = styled.div`
  display: block;
  height: 100%;
  min-height: ${COLLAPSED_STD_GRAPH_HEIGHT_IN_REM};
`;

export const BasalRateContent = styled.div`
  display: block;
`;

export const RadialChartBlockDiv = styled.div`
  flex: 1;
  text-align: center;
  align-self: center;

  svg {
    max-width: 12rem;
  }
`;

RadialChartBlockDiv.displayName = 'RadialChartBlockDiv';

export const RadialChartContainerDiv = styled.div`
  margin: 0 ${spacing.four} 0 0;
`;

RadialChartContainerDiv.displayName = 'RadialChartContainerDiv';

export const DetailSection = styled.div`
  margin: ${spacing.four};
`;

DetailSection.displayName = 'DetailSection';

export const DetailRow = styled.div`
  flex: 1;
  flex-direction: row;
  display: flex;
  align-self: center;
`;

DetailRow.displayName = 'DetailRow';

export const DetailWrapperDiv = styled.div`
  margin: 0 0 ${spacing.four};
`;

DetailWrapperDiv.displayName = 'DetailWrapperDiv';
