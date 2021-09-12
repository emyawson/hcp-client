import { isNil } from 'ramda';
import styled from 'styled-components';
import { flex } from 'styled-system';

import {
  borderRadius,
  boxShadows,
  boxShadow,
  colors,
  spacing,
  zIndexes,
} from 'src/domains/diagnostics/styles';

import { COLLAPSED_STD_GRAPH_HEIGHT_IN_REM } from './graph.constants';

export const CardWrapper = styled.div`
  position: relative;
  z-index: ${zIndexes.base};
`;

CardWrapper.displayName = 'CardWrapper';

export const FlexibleHeightCard = styled.div`
  position: relative;
  z-index: ${zIndexes.base};
  background: ${colors.white};
  margin-bottom: ${spacing.two};
  border: 1px solid ${colors.silverMedium};
  border-radius: ${borderRadius.six};
  box-shadow: ${boxShadows.two};
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex-basis: auto;
  }
`;

export const NoHeightSetCard = FlexibleHeightCard.extend`
  height: auto;
`;

FlexibleHeightCard.displayName = 'FlexibleHeightCard';

export const GraphWrapperDiv = styled.div`
  position: relative;
  min-height: inherit;
  height: ${props =>
    props.collapsed ? COLLAPSED_STD_GRAPH_HEIGHT_IN_REM : 'auto'};
  min-width: ${props => props.minWidth || null};
  padding: ${props => props.p || `0 ${spacing.two} ${spacing.two}`};
  flex: 1;
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  &:focus,
  & *:focus {
    outline: none;
  }
  ${flex};
`;

GraphWrapperDiv.displayName = 'GraphWrapperDiv';

export const GraphHintDiv = styled.div`
  background-color: ${colors.white};
  border-radius: ${borderRadius.three};
  box-shadow: ${boxShadow({
    color: colors.black,
    size: 'small',
  })};
  color: ${colors.charcoal};
  overflow: hidden;
`;

GraphHintDiv.displayName = 'GraphHintDiv';

export const GraphDetailContainer = styled.div`
  width: 100%;
  margin-top: ${({ mt }) => (!isNil(mt) ? mt : 0)};
  background-color: ${colors.white};
  height: 12rem;
  min-height: 12rem;
`;

GraphDetailContainer.displayName = 'GraphDetailContainer';

export const GridWrapper = styled.div`
  min-height: 100vh;
`;

GridWrapper.displayName = 'GridWrapper';
