import { isEmpty } from 'ramda';
import React from 'react';
import { Subject } from 'rxjs/Subject';

import { Graph } from 'src/domains/diagnostics/lib';
import { RenderIf } from 'src/domains/diagnostics/utils';
import { withToolTip } from 'src/domains/diagnostics/utils/with-tool-tip';
import { GraphDetail, ToolTip } from 'src/domains/diagnostics/components';
import {
  ResizeGraphWrapper,
  DetailToolTip,
} from 'src/domains/diagnostics/components';
import {
  AppleIcon,
  AppleEatenIcon,
} from 'src/domains/diagnostics/assets/icons';
import { filterVerticalTicksForViewAndVisibilityTolerance } from 'src/domains/diagnostics/utils/graphs.util';
import { withGraphLoader } from 'src/domains/diagnostics/utils';

import { TrendPlotWrapperDiv } from '../trend.style';
import { GraphDetailContainer } from '../../graph.style';
import { getToolTipValueColor, navigateToLogbook } from '../../graph.util';
import { DetailGraphPlot, TrendAxesPlot } from '../components';
import { X_AXIS_WIDTH } from '../trend.constants';
import {
  LOGBOOK_TYPE_DETAILS,
  Y_AXIS_TICK_VISIBILITY_TOLERANCE,
} from '../../graph.constants';

const TrendPlotWrapperDivWithLoader = withGraphLoader(TrendPlotWrapperDiv);

const clickStream$ = new Subject();
const stop$ = new Subject();

class TrendDetail extends React.Component {
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
      graphData,
      targetRange,
      threshold,
      verticalTicks,
      verticalLabel,
      horizontalDayTicks,
      horizontalMonthYearTicks,
      showGridLines,
      graphDetails,
      showDetails = true,
      yDirection = -1,
      toolTip,
      showToolTip,
      hideToolTip,
      flexibleHeight,
      graphYMax,
      isLoading,
    } = this.props;
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
              <TrendPlotWrapperDivWithLoader
                hasError={isEmpty(measurements) && !isLoading}
                isLoading={isLoading}
                onClick={this.onGraphClick}
                collapsed={collapsed}
              >
                <RenderIf validate={width && height}>
                  <Graph
                    viewportRight={width}
                    viewportBottom={height}
                    height={height}
                    anchor="xMidYMid"
                  >
                    <DetailGraphPlot
                      height={height}
                      width={width * X_AXIS_WIDTH}
                      yDirection={yDirection}
                      targetRange={targetRange}
                      threshold={threshold.value}
                      horizontalDayTicks={horizontalDayTicks}
                      showGridLines={showGridLines}
                      graphData={graphData}
                      selectedDate={this.state.selectedDate}
                      onLineClick={this.onLineClick}
                      onPointMouseOver={showToolTip}
                      onPointMouseOut={hideToolTip}
                      graphYMax={graphYMax}
                    />
                    <TrendAxesPlot
                      collapsed={collapsed}
                      verticalTicks={filteredVerticalTicks}
                      verticalLabel={verticalLabel}
                      horizontalDayTicks={horizontalDayTicks}
                      horizontalMonthYearTicks={horizontalMonthYearTicks}
                      width={width * X_AXIS_WIDTH}
                      height={height}
                      yDirection={yDirection}
                    />
                  </Graph>
                </RenderIf>
              </TrendPlotWrapperDivWithLoader>
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
          {renderToolTip(toolTip, threshold, targetRange)}
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
}

const renderToolTip = (
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

export const TrendDetailComponent = withToolTip(TrendDetail);
