import React from 'react';
import { isEmpty } from 'ramda';

import {
  Candlestick,
  ThresholdLine,
  TargetRange,
  BackgroundPanelsFitted,
  GridLines,
  ResizeGraphWrapper,
  TrendToolTip,
} from 'src/domains/diagnostics/components';
import {
  Graph,
  Plot,
  VerticalAxis,
  HorizontalAxis,
  TrendSeries,
} from 'src/domains/diagnostics/lib';
import { colors, strokeWidth } from 'src/domains/diagnostics/styles';
import { GraphDetail, ToolTip } from 'src/domains/diagnostics/components';
import { filterVerticalTicksForViewAndVisibilityTolerance } from 'src/domains/diagnostics/utils/graphs.util';
import { RenderIf } from 'src/domains/diagnostics/utils';
import { withToolTip } from 'src/domains/diagnostics/utils/with-tool-tip';
import { withGraphLoader } from 'src/domains/diagnostics/utils';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';
import { translate } from 'src/i18n';

import { StandardWeekTrendWrapperDiv } from './standard-week-trend.style';

import { GraphDetailContainer } from '../graph.style';
import { getToolTipValueColor } from '../graph.util';
import {
  Y_AXIS_TICK_VISIBILITY_TOLERANCE,
  PRIMARY_TICK_COLOR,
} from '../graph.constants';

const StandardWeekTrendPlot = ({
  x,
  y,
  width,
  height,
  points,
  padding = 0,
  targetRange,
  threshold,
  horizontalTicks,
  verticalTicks,
  yDirection = -1,
  showGridLines,
  onCandleStickMouseOver,
  onCandleStickMouseOut,
}) => (
  <Plot
    id="main-viewport"
    x={x}
    y={y}
    width={width}
    height={height}
    padding={padding}
  >
    <BackgroundPanelsFitted
      width={width}
      height={height}
      count={points.length / 2}
      primary={colors.silverLight}
      secondary={colors.white}
    />
    <RenderIf validate={showGridLines}>
      <GridLines
        width={width}
        height={height}
        verticalCount={horizontalTicks.length}
        horizontalCount={verticalTicks.filter(tick => tick.gridLine).length}
      />
    </RenderIf>
    <TargetRange
      min={targetRange.min}
      max={targetRange.max}
      width={width}
      height={height}
      plotHeight={400}
    />
    <ThresholdLine
      threshold={threshold.value}
      width={width}
      height={height}
      plotHeight={400}
    />
    <TrendSeries
      width={width}
      height={height}
      points={points}
      candlestickShape={Candlestick}
      onMouseOver={onCandleStickMouseOver}
      onMouseOut={onCandleStickMouseOut}
      range={points.length}
      pointsOnAxes
    />

    {/* Plot borders */}
    <line
      x1={0}
      y1={0}
      x2={0}
      y2={yDirection * height}
      strokeWidth={strokeWidth.one}
      stroke={colors.grayLight}
    />
    <line
      x1={0}
      y1={0}
      x2={width}
      y2={0}
      strokeWidth={strokeWidth.one}
      stroke={colors.grayLight}
    />
    <line
      x1={0}
      y1={yDirection * height}
      x2={width}
      y2={yDirection * height}
      strokeWidth={strokeWidth.one}
      stroke={colors.grayLight}
    />
    <line
      x1={width}
      y1={0}
      x2={width}
      y2={yDirection * height}
      strokeWidth={strokeWidth.one}
      stroke={colors.grayLight}
    />
  </Plot>
);

const AxesPlot = ({
  x,
  y,
  axisX,
  axisY,
  verticalTicks,
  horizontalTicks,
  width,
  height,
  innerPlotWidth,
  innerPlotHeight,
}) => {
  const numberLabelFontSize = (width / 4) * 0.03;
  const textLabelFontSize = (width / 4) * 0.035;
  const bucketWidth = innerPlotWidth / horizontalTicks.length;

  return (
    <Plot id="main-axes" x={x} y={y} width={width} height={height}>
      <VerticalAxis
        x={axisX * 0.85}
        y={axisY}
        height={innerPlotHeight}
        axisColor={colors.grayLight}
        Tick={tick => (
          <React.Fragment key={`${tick.value}`}>
            <line
              x1={axisX * 0.05}
              x2={axisX * 0.85}
              y1={tick.value}
              y2={tick.value}
              strokeWidth={strokeWidth.one}
              stroke={tick.color || PRIMARY_TICK_COLOR}
            />
            <text
              y={tick.value}
              textAnchor="end"
              fontSize={numberLabelFontSize}
              dy="0.5em"
              fill={tick.color || colors.black}
            >
              {tick.label}
            </text>
          </React.Fragment>
        )}
        ticks={verticalTicks}
      />
      <VerticalAxis
        x={axisX * 0.3}
        y={axisY}
        height={innerPlotHeight}
        axisColor={colors.grayLight}
        Tick={tick => (
          <React.Fragment key={`${tick.value}`}>
            <text
              y={tick.value}
              textAnchor="middle"
              transform={`rotate(270, 0, ${tick.value})`}
              fontSize={textLabelFontSize}
            >
              {tick.label}
            </text>
          </React.Fragment>
        )}
        ticks={[
          {
            value: 0.5,
            label: translate('graphDetails.legend.bloodGlucoseWithMgPerDL'),
          },
        ]}
      />
      <HorizontalAxis
        x={axisX}
        y={axisY * 0.5}
        width={innerPlotWidth}
        Tick={tick => (
          <React.Fragment key={`${tick.value}`}>
            <text
              textAnchor="middle"
              x={tick.value + bucketWidth / 2}
              fontSize={numberLabelFontSize}
              fill={colors.grayDark}
            >
              {tick.label}
            </text>
          </React.Fragment>
        )}
        ticks={horizontalTicks}
        axisColor={colors.grayLight}
      />
    </Plot>
  );
};

const StandardWeekTrendWrapperDivWithLoader = withGraphLoader(
  StandardWeekTrendWrapperDiv,
);

export const StandardWeekTrend = withToolTip(
  ({
    measurements,
    graphData,
    graphDetails,
    showGraphDetails = true,
    showGridLines,
    targetRange,
    threshold,
    horizontalTicks,
    verticalTicks,
    yDirection = -1,
    toolTip,
    showToolTip,
    hideToolTip,
    flexibleHeight,
    isLoading,
    graphYMax,
  }) => (
    <React.Fragment>
      <ResizeGraphWrapper
        render={layout => {
          const height = layout.height;
          const width = layout.width;

          const innerPlotWidth = width * 0.95;
          const innerPlotHeight = height * 0.8;
          const innerPlotX = width * 0.04;
          const innerPlotY = height * 0.1;

          const filteredVerticalTicks = filterVerticalTicksForViewAndVisibilityTolerance(
            verticalTicks,
            flexibleHeight,
            threshold,
            targetRange,
            Y_AXIS_TICK_VISIBILITY_TOLERANCE,
            graphYMax,
          );

          return (
            <StandardWeekTrendWrapperDivWithLoader
              hasError={isEmpty(measurements) && !isLoading}
              isLoading={isLoading}
            >
              <RenderIf validate={width && height}>
                <Graph
                  viewportRight={width}
                  viewportBottom={height}
                  height={height}
                  anchor="xMidYMid"
                >
                  <AxesPlot
                    x={0}
                    y={0}
                    axisX={innerPlotX}
                    axisY={innerPlotY}
                    verticalTicks={filteredVerticalTicks}
                    horizontalTicks={horizontalTicks}
                    width={width}
                    height={height}
                    innerPlotWidth={innerPlotWidth}
                    innerPlotHeight={innerPlotHeight}
                  />
                  <StandardWeekTrendPlot
                    x={innerPlotX}
                    y={innerPlotY}
                    width={innerPlotWidth}
                    height={innerPlotHeight}
                    points={graphData}
                    verticalTicks={filteredVerticalTicks}
                    horizontalTicks={horizontalTicks}
                    targetRange={targetRange}
                    threshold={threshold}
                    showGridLines={showGridLines}
                    onCandleStickMouseOver={showToolTip}
                    onCandleStickMouseOut={hideToolTip}
                  />
                </Graph>
              </RenderIf>
            </StandardWeekTrendWrapperDivWithLoader>
          );
        }}
      />
      <RenderIf
        validate={showGraphDetails && !isEmpty(measurements) && !isLoading}
      >
        <GraphDetailContainer>
          <GraphDetail graphStatistics={graphDetails} graphType="trend" />
        </GraphDetailContainer>
      </RenderIf>
      <RenderIf validate={toolTip.x && toolTip.y}>
        {renderToolTip(toolTip, threshold, targetRange)}
      </RenderIf>
    </React.Fragment>
  ),
);

const renderToolTip = (
  { x, y, data },
  { data: thresholdData },
  { data: targetRangeData },
) => {
  const { stdDev, max, min, mean, count } = data;

  return (
    <ToolTip x={x} y={y}>
      <TrendToolTip
        max={max}
        min={min}
        mean={mean && mean.toFixed(1)}
        numMeasurements={count}
        stDev={
          !stdDev || stdDev === EMPTY_VALUE_PLACEHOLDER
            ? stdDev
            : stdDev.toFixed(1)
        }
        meanColor={getToolTipValueColor(
          mean,
          thresholdData.value,
          targetRangeData,
        )}
        maxColor={getToolTipValueColor(
          max,
          thresholdData.value,
          targetRangeData,
        )}
        minColor={getToolTipValueColor(
          min,
          thresholdData.value,
          targetRangeData,
        )}
      />
    </ToolTip>
  );
};
