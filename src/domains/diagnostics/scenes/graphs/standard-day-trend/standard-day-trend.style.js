import styled from 'styled-components';

import { spacing } from 'src/domains/diagnostics/styles';

import { MIN_EXPANDED_STD_GRAPH_HEIGHT_IN_REM } from '../graph.constants';

export const StandardDayTrendWrapperDiv = styled.div`
  position: relative;
  height: 100%;
  min-height: ${MIN_EXPANDED_STD_GRAPH_HEIGHT_IN_REM};
  margin: ${spacing.three} ${spacing.two} 0;
  display: flex;
  flex-direction: column;
`;

StandardDayTrendWrapperDiv.displayName = 'StandardDayTrendWrapperDiv';
