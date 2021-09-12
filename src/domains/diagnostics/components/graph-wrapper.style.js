import styled from 'styled-components';
import { space } from 'styled-system';

import {
  TabsContainer,
  TabContent,
} from 'src/domains/diagnostics/components/tabs';
import {
  GridContainer,
  GridItem,
} from 'src/domains/diagnostics/components/grid-layout';
import { convertPxToRem } from 'src/domains/diagnostics/utils';
import { colors } from 'src/domains/diagnostics/styles';
import { GRAPH_CONTAINER_MIN_HEIGHT } from 'src/domains/diagnostics/scenes/graphs/graph.constants';

export const GraphTabsContainer = styled(TabsContainer)`
  flex: 1;
  display: flex;
  flex-direction: column;
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex-basis: auto;
  }
`;

export const GridItemNoFlex = styled(GridItem)`
  flex: 0 0 auto;
`;

export const GridItemGraph = styled(GridItem)`
  flex: 1 0 100%;
  display: flex;
  flex-direction: column;
  min-height: ${GRAPH_CONTAINER_MIN_HEIGHT};
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex-basis: auto;
  }
`;

export const GraphTabsContent = styled(TabContent)`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex-basis: auto;
  }
`;

export const GraphWrapperGridContainer = GridContainer.extend`
  height: calc(100vh - 9rem);
  flex-direction: column;
  flex-wrap: nowrap;
`;

export const NavContainer = styled.div`
  ${space};
`;

export const NavContainerOptions = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  margin-left: auto;
  padding-right: 2rem;
  border-bottom: ${convertPxToRem(3)} solid ${colors.silver};
`;
export const NavContainerMain = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;
