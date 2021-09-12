import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { translate } from 'src/i18n'; // TODO: move to diagnostics
import {
  Tabs,
  TabLinkItem,
  TabsHeader,
} from 'src/domains/diagnostics/components/tabs';
import { SectionHeader } from 'src/domains/diagnostics/components';
import { colors, spacing } from 'src/domains/diagnostics/styles';
import { PatientSummaryBarContainer } from 'src/domains/diagnostics/widgets/patient-summary-bar';
import { GraphOptions } from 'src/domains/diagnostics/components/graph-options/graph-options.component';
import {
  GRAPHS,
  GRAPH_TYPE_DETAILS,
  GRAPH_TYPE_TREND,
} from 'src/domains/diagnostics/scenes/graphs/graph.constants';
import { GlobalGraphOptionsContainer } from 'src/domains/diagnostics/widgets/global-graph-options/global-graph-options.container';

import { tabs } from './graph-wrapper.constants';
import {
  GraphTabsContainer,
  GraphTabsContent,
  GraphWrapperGridContainer,
  GridItemNoFlex,
  GridItemGraph,
  NavContainer,
  NavContainerMain,
  NavContainerOptions,
} from './graph-wrapper.style';
import {
  getGridSizeRuleForGraphContainer,
  getGraphNameFromUrl,
} from './graph-wrapper.util';

import { FlexibleHeightCard } from '../scenes/graphs/graph.style';
import { connectGraphs } from '../scenes/graphs/graph.container';

export class GraphPage extends React.Component {
  componentDidMount() {
    const {
      changeGraph,
      location: { pathname: path },
      match: { url },
    } = this.props;
    changeGraph(getGraphNameFromUrl(path, url));
  }

  render() {
    const { children, changeGraph, graph, graphType, match } = this.props;

    const detailsGraphToggleProps = {
      bloodGlucoseToggle: true,
      bgBeforeMealToggle: true,
      bgAfterMealToggle: true,
      meanBloodGlucoseToggle: true,
      connectingLinesToggle: true,
      gridLinesToggle: true,
    };
    const trendGraphToggleProps = {
      bloodGlucoseToggle: false,
      bgBeforeMealToggle: false,
      bgAfterMealToggle: false,
      meanBloodGlucoseToggle: false,
      connectingLinesToggle: false,
      gridLinesToggle: true,
    };

    const isDetailsGraph =
      (graph === GRAPHS.STANDARD_DAY ||
        graph === GRAPHS.STANDARD_WEEK ||
        graph === GRAPHS.TREND) &&
      graphType === GRAPH_TYPE_DETAILS;

    const isTrendGraph =
      graph === GRAPHS.METABOLIC_RATE ||
      ((graph === GRAPHS.STANDARD_DAY ||
        graph === GRAPHS.STANDARD_WEEK ||
        graph === GRAPHS.TREND) &&
        graphType === GRAPH_TYPE_TREND);

    return (
      <GraphWrapperGridContainer
        marginBottom
        gridTemplateRows={`min-content min-content ${getGridSizeRuleForGraphContainer(
          graph,
        )}`}
      >
        <GridItemNoFlex span="12">
          <PatientSummaryBarContainer />
        </GridItemNoFlex>
        <GridItemNoFlex span="12">
          <SectionHeader
            textColor={colors.charcoal}
            bottomMarginHeadline={spacing.two}
            title={translate('bloodGlucoseStats.title')}
          />
          <GlobalGraphOptionsContainer />
        </GridItemNoFlex>
        <GridItemGraph span="12">
          <FlexibleHeightCard>
            <Tabs
              render={children => (
                <GraphTabsContainer>{children}</GraphTabsContainer>
              )}
            >
              <NavContainerMain>
                <NavContainer>
                  <TabsHeader px={4} pt={4} mr="auto" ml="0">
                    {tabs(changeGraph).map((t, index) => (
                      <TabLinkItem
                        {...t}
                        currentTitle={graph}
                        key={`${t}-${index}`}
                      />
                    ))}
                  </TabsHeader>
                </NavContainer>
                <NavContainerOptions>
                  <GraphOptions
                    match={match}
                    {...isDetailsGraph && detailsGraphToggleProps}
                    {...isTrendGraph && trendGraphToggleProps}
                  />
                </NavContainerOptions>
              </NavContainerMain>

              <GraphTabsContent>{children}</GraphTabsContent>
            </Tabs>
          </FlexibleHeightCard>
        </GridItemGraph>
      </GraphWrapperGridContainer>
    );
  }
}
export const GraphPageWrapper = withNavigators =>
  compose(
    connectGraphs(withNavigators),
    withRouter,
  )(GraphPage);
