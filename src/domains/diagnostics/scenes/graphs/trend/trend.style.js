import styled from 'styled-components';

import { spacing } from 'src/domains/diagnostics/styles';

import {
  MIN_EXPANDED_STD_GRAPH_HEIGHT_IN_REM,
  COLLAPSED_STD_GRAPH_HEIGHT_IN_REM,
} from '../graph.constants';

export const TrendPlotWrapperDiv = styled.div`
  position: relative;
  height: ${props =>
    props.collapsed ? COLLAPSED_STD_GRAPH_HEIGHT_IN_REM : '100%'};
  min-height: ${props =>
    props.collapsed
      ? COLLAPSED_STD_GRAPH_HEIGHT_IN_REM
      : MIN_EXPANDED_STD_GRAPH_HEIGHT_IN_REM};
  margin: ${spacing.three} ${spacing.two} 0;
  display: flex;
  flex-direction: column;
`;

TrendPlotWrapperDiv.displayName = 'TrendPlotWrapperDiv';
