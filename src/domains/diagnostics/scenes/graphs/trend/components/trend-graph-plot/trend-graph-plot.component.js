import React from 'react';

import { RenderIf } from 'src/domains/diagnostics/utils';
import { Plot, TrendSeries } from 'src/domains/diagnostics/lib';
import {
  Candlestick,
  TargetRange,
  ThresholdLine,
  GridLines,
} from 'src/domains/diagnostics/components';

import {
  Y_AXIS_HEIGHT,
  X_AXIS_WIDTH,
  Y_AXIS_Y_POS,
  Y_AXIS_X_POS,
} from '../../trend.constants';

const GRAPH_Y_MAX = 400;
const GRAPH_Y_INTERVAL = 50;

export const TrendGraphPlot = ({
  height,
  width,
  yDirection,
  targetRange,
  threshold,
  horizontalDayTicks,
  points,
  showGridLines,
  onCandleStickMouseOver,
  onCandleStickMouseOut,
  graphYMax = GRAPH_Y_MAX,
}) => (
  <Plot
    id="trend-trend"
    x={width * Y_AXIS_X_POS}
    y={height * Y_AXIS_Y_POS}
    height={height * Y_AXIS_HEIGHT}
    width={width * X_AXIS_WIDTH}
  >
    <RenderIf validate={showGridLines}>
      <GridLines
        width={width * X_AXIS_WIDTH}
        height={height * Y_AXIS_HEIGHT}
        horizontalCount={graphYMax / GRAPH_Y_INTERVAL}
        verticalCount={horizontalDayTicks.length}
      />
    </RenderIf>
    <TargetRange
      width={width * X_AXIS_WIDTH}
      height={height * Y_AXIS_HEIGHT}
      min={targetRange.min}
      max={targetRange.max}
    />
    <ThresholdLine
      width={width * X_AXIS_WIDTH}
      height={height * Y_AXIS_HEIGHT}
      threshold={threshold}
      yDirection={yDirection}
    />
    <TrendSeries
      width={width * X_AXIS_WIDTH}
      height={height * Y_AXIS_HEIGHT}
      points={points}
      itemScale={0.6}
      candlestickShape={Candlestick}
      onMouseOver={onCandleStickMouseOver}
      onMouseOut={onCandleStickMouseOut}
      range={horizontalDayTicks.length}
    />
  </Plot>
);
