import React from 'react';
import { isEmpty } from 'ramda';
import { Subject } from 'rxjs/Subject';

import { Graph } from 'src/domains/diagnostics/lib';
import { RenderIf } from 'src/domains/diagnostics/utils';
import { withToolTip } from 'src/domains/diagnostics/utils/with-tool-tip';
import { GraphDetail, ToolTip } from 'src/domains/diagnostics/components';
import {
  ResizeGraphWrapper,
  DetailToolTip,
  GraphStartTimeDropdown,
} from 'src/domains/diagnostics/components';
import {
  AppleIcon,
  AppleEatenIcon,
} from 'src/domains/diagnostics/assets/icons';
import { filterVerticalTicksForViewAndVisibilityTolerance } from 'src/domains/diagnostics/utils/graphs.util';
import { withGraphLoader } from 'src/domains/diagnostics/utils';
import {
  LOGBOOK_TYPE_DETAILS,
  Y_AXIS_TICK_VISIBILITY_TOLERANCE,
} from 'src/domains/diagnostics/scenes/graphs/graph.constants';

import { GraphPlot, AxesPlot } from './components';
import { X_AXIS_WIDTH } from './standard-day-detail.constant';
import { StandardDayPlotWrapperDiv } from './standard-day-detail.style';

import { GraphDetailContainer } from '../graph.style';
import { getToolTipValueColor, navigateToLogbook } from '../graph.util';

const StandardDayPlotWrapperDivWithLoader = withGraphLoader(
  StandardDayPlotWrapperDiv,
);

const clickStream$ = new Subject();
const stop$ = new Subject();

class StandardDayDetailComponent extends React.Component {
  state = {
    selectedDate: null,
  };

  componentDidMount() {
    clickStream$
      .bufferWhen(() => clickStream$.debounceTime(250))
      .takeUntil(stop$)
      .subscribe(values => {
        if (values.length === 1) {
          this.setState({ selectedDate: values[0] });
        } else {
          const { changeLogbookType, history } = this.props;
          navigateToLogbook(
            history,
            values[0],
            changeLogbookType,
            LOGBOOK_TYPE_DETAILS,
          );
        }
      });
  }
  render() {
    const {
      collapsed,
      measurements,
      points,
      meanPoints,
      backgroundPanels,
      lines,
      targetRange,
      threshold,
      verticalTicks,
      verticalLabel,
      timeHorizontalTicks,
      timeIntervalHorizontalTicks,
      showGridLines,
      graphDetails,
      showDetails = true,
      yDirection = -1,
      toolTip,
      showToolTip,
      hideToolTip,
      flexibleHeight,
      isLoading,
      graphYMax,
    } = this.props;

    const { selectedDate } = this.state;

    return (
      <React.Fragment>
        <ResizeGraphWrapper
          render={layout => {
            const height = layout.height;
            const width = layout.width;

            const filteredVerticalTicks = filterVerticalTicksForViewAndVisibilityTolerance(
              verticalTicks,
              flexibleHeight,
              threshold,
              targetRange,
              Y_AXIS_TICK_VISIBILITY_TOLERANCE,
              graphYMax,
            );

            return (
              <StandardDayPlotWrapperDivWithLoader
                collapsed={collapsed}
                hasError={isEmpty(measurements) && !isLoading}
                isLoading={isLoading}
                onClick={this.onGraphClick}
              >
                <RenderIf validate={width && height}>
                  <Graph
                    viewportRight={width}
                    viewportBottom={height}
                    height={height}
                    anchor="xMidYMid"
                  >
                    <GraphPlot
                      height={height}
                      width={width * X_AXIS_WIDTH}
                      points={points}
                      meanPoints={meanPoints}
                      lines={lines}
                      backgroundPanels={backgroundPanels}
                      yDirection={yDirection}
                      targetRange={targetRange}
                      threshold={threshold.value}
                      horizontalTicks={timeHorizontalTicks}
                      showGridLines={showGridLines}
                      onPointMouseOver={showToolTip}
                      onPointMouseOut={hideToolTip}
                      graphYMax={graphYMax}
                      selectedDate={selectedDate}
                      onLineClick={this.onLineClick}
                    />
                    <AxesPlot
                      collapsed={collapsed}
                      verticalTicks={filteredVerticalTicks}
                      verticalLabel={verticalLabel}
                      timeHorizontalTicks={timeHorizontalTicks}
                      timeIntervalHorizontalTicks={timeIntervalHorizontalTicks}
                      width={width * X_AXIS_WIDTH}
                      height={height}
                      yDirection={yDirection}
                    />
                  </Graph>
                </RenderIf>
                <RenderIf validate={showDetails}>
                  <GraphStartTimeDropdown />
                </RenderIf>
              </StandardDayPlotWrapperDivWithLoader>
            );
          }}
        />
        <RenderIf
          validate={showDetails && !isEmpty(measurements) && !isLoading}
        >
          <GraphDetailContainer>
            <GraphDetail graphStatistics={graphDetails} graphType="detail" />
          </GraphDetailContainer>
        </RenderIf>
        <RenderIf validate={toolTip.x && toolTip.y}>
          {this.renderToolTip(toolTip, threshold, targetRange)}
        </RenderIf>
      </React.Fragment>
    );
  }

  onLineClick = point => e => {
    e.stopPropagation();
    if (!this.props.collapsed) {
      clickStream$.next(point);
    }
  };

  onGraphClick = () => {
    if (!this.props.collapsed) {
      this.setState({ selectedDate: null });
    }
  };

  renderToolTip = (
    { x, y, data },
    { data: thresholdData },
    { data: targetRangeData },
  ) => {
    const { date, value, beforeMeal, afterMeal } = data;

    const icon = beforeMeal ? (
      <AppleIcon height="17" />
    ) : afterMeal ? (
      <AppleEatenIcon height="17" />
    ) : null;

    return (
      <ToolTip x={x} y={y}>
        <DetailToolTip
          icon={icon}
          topBarColor={getToolTipValueColor(
            value,
            thresholdData.value,
            targetRangeData,
          )}
          date={date}
          glucoseValue={value}
        />
      </ToolTip>
    );
  };
}

export const StandardDayDetail = withToolTip(StandardDayDetailComponent);
