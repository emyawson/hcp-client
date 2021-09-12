import React, { Component } from 'react';
import { Subject } from 'rxjs/Subject';
import { isEmpty } from 'ramda';

import { Graph } from 'src/domains/diagnostics/lib';
import { RenderIf } from 'src/domains/diagnostics/utils';
import { LocalizedText } from 'src/domains/diagnostics/components';
import {
  GraphDetail,
  ResizeGraphWrapper,
  ToolTip,
} from 'src/domains/diagnostics/components';
import { withGraphLoader } from 'src/domains/diagnostics/utils';

import { CardSectionTitleDiv, MetabolicWrapperDiv } from './metabolic.style';
import {
  AxesPlot,
  MetabolicPlot,
  MetabolicDataPoints,
  MetabolicTooltip,
  MetabolicEllipses,
  MetabolicStabilityLabels,
} from './components';

import { LOGBOOK_TYPE_STATS } from '../graph.constants';
import { GraphDetailContainer } from '../graph.style';
import { navigateToLogbook } from '../graph.util';

const clickStream$ = new Subject();
const stop$ = new Subject();

const MetabolicWrapperDivWithLoader = withGraphLoader(MetabolicWrapperDiv);

export class Metabolic extends Component {
  state = {
    selectedPoint: null,
  };

  componentDidMount() {
    clickStream$
      .bufferWhen(() => clickStream$.debounceTime(250))
      .takeUntil(stop$)
      .subscribe(values => {
        if (values.length === 1) {
          this.setState({ selectedPoint: values[0].index });
        } else {
          const { history, changeLogbookType } = this.props;
          navigateToLogbook(
            history,
            values[0].date,
            changeLogbookType,
            LOGBOOK_TYPE_STATS,
          );
        }
      });
  }

  componentWillUnmount() {
    stop$.next();
    stop$.complete();
  }

  render() {
    const {
      collapsed,
      graphData,
      graphDetails,
      thresholds,
      verticalTicks,
      verticalTicksDashboard,
      verticalLabel,
      horizontalTicks,
      horizontalLabel,
      toggles,
      meanBGSD,
      sd1,
      toolTip,
      showToolTip,
      hideToolTip,
      stabilityLabels,
      showDetails = true,
      isLoading,
    } = this.props;

    const { selectedPoint } = this.state;

    return (
      <React.Fragment>
        <RenderIf validate={showDetails}>
          <CardSectionTitleDiv>
            <LocalizedText textKey="graphs.metabolicTitle" />
          </CardSectionTitleDiv>
        </RenderIf>
        <ResizeGraphWrapper
          render={layout => {
            const height = layout.height;
            const width = layout.width;

            const innerPlotWidth = width * 0.95;
            const innerPlotX = width * 0.04;
            return (
              <MetabolicWrapperDivWithLoader
                collapsed={collapsed}
                hasError={isEmpty(graphData) && !isLoading}
                isLoading={isLoading}
                showDetails={showDetails}
                onClick={this.onGraphClick}
              >
                <Graph
                  viewportRight={width}
                  viewportBottom={height}
                  height={height}
                  anchor="xMidYMid"
                >
                  <MetabolicStabilityLabels
                    x={innerPlotX}
                    y={height * 0.1}
                    width={innerPlotWidth - innerPlotX}
                    height={height * 0.8}
                    padding={height * 0.02}
                    labels={stabilityLabels}
                  />
                  <MetabolicPlot
                    x={innerPlotX}
                    y={height * 0.1}
                    width={innerPlotWidth - innerPlotX}
                    height={height * 0.8}
                    padding={height * 0.02}
                    thresholds={thresholds}
                    toggles={toggles}
                  />
                  <AxesPlot
                    x={0}
                    y={0}
                    axisX={innerPlotX}
                    verticalTicks={verticalTicks}
                    verticalTicksDashboard={verticalTicksDashboard}
                    verticalLabel={verticalLabel}
                    horizontalTicks={horizontalTicks}
                    horizontalLabel={horizontalLabel}
                    width={width}
                    innerPlotWidth={innerPlotWidth}
                    height={height}
                    showDetails={showDetails}
                  />
                  <RenderIf validate={graphData && graphData.length}>
                    <MetabolicEllipses
                      x={innerPlotX}
                      y={height * 0.1}
                      width={innerPlotWidth - innerPlotX}
                      height={height * 0.8}
                      padding={height * 0.02}
                      meanBGSD={meanBGSD}
                      sd1={sd1}
                    />
                    <MetabolicDataPoints
                      x={innerPlotX}
                      y={height * 0.1}
                      width={innerPlotWidth - innerPlotX}
                      height={height * 0.8}
                      padding={height * 0.02}
                      graphData={graphData}
                      onPointMouseEnter={showToolTip}
                      onPointMouseLeave={hideToolTip}
                      meanBGSD={meanBGSD}
                      selectedPoint={selectedPoint}
                      onPointClick={this.onDataPointClick}
                      isMaximized={showDetails}
                    />
                  </RenderIf>
                </Graph>
              </MetabolicWrapperDivWithLoader>
            );
          }}
        />
        <RenderIf validate={showDetails && !isEmpty(graphData) && !isLoading}>
          <GraphDetailContainer>
            <GraphDetail graphStatistics={graphDetails} graphType="metabolic" />
          </GraphDetailContainer>
        </RenderIf>
        <RenderIf validate={toolTip && toolTip.x && toolTip.y}>
          {this.renderToolTip(toolTip)}
        </RenderIf>
      </React.Fragment>
    );
  }

  onGraphClick = e => this.setState({ selectedPoint: null });

  onDataPointClick = point => e => {
    e.stopPropagation();
    clickStream$.next(point);
  };

  renderToolTip = ({ x, y, data }) => {
    const { meanRounded, stdRounded, dateLabel } = data;
    return (
      <ToolTip x={x} y={y}>
        <MetabolicTooltip
          date={dateLabel}
          stdDev={stdRounded}
          mean={meanRounded}
        />
      </ToolTip>
    );
  };
}
