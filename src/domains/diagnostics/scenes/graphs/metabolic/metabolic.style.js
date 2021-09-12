import styled from 'styled-components';

import { spacing, fontSize, colors } from 'src/domains/diagnostics/styles';

import {
  MIN_EXPANDED_STD_GRAPH_HEIGHT_IN_REM,
  COLLAPSED_STD_GRAPH_HEIGHT_IN_REM,
} from '../graph.constants';

export const CardSectionTitleDiv = styled.div`
  font-size: ${fontSize.headline};
  text-transform: capitalize;
  color: ${colors.charcoal};
  padding-left: ${spacing.four};
`;

export const MetabolicWrapperDiv = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  min-height: ${props =>
    props.collapsed
      ? COLLAPSED_STD_GRAPH_HEIGHT_IN_REM
      : MIN_EXPANDED_STD_GRAPH_HEIGHT_IN_REM};
  height: ${props =>
    props.collapsed ? COLLAPSED_STD_GRAPH_HEIGHT_IN_REM : '100%'};
  margin: 0 ${spacing.two} 0;
  flex-direction: column;
`;

MetabolicWrapperDiv.displayName = 'MetabolicWrapperDiv';
